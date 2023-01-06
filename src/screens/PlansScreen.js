import React, { useEffect, useState } from 'react'
import db from '../firebase'
import './PlansScreen.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice';
import { Modal } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { Fade } from '@material-ui/core';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleOpen = () => {
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                //First, we create an empty (insided this scope) products object
                const products = {};
                //querySnapshot returns a bunch of docs, so we call the forEach method
                //in order to acces each doc
                //The expression "async productDoc =>" will give us the productDoc
                //that we can access and populate with it our products object
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    //Each product has its collection of prices
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });
                setProducts(products)
            });
    }, []);

    useEffect(() => {
        db.collection('customers')
            .where('email', '==', user.email)
            .get()
            .then(querySnapshot => {
                //Since we know there is only one email per record we access the first element
                const productId = querySnapshot.docs[0].data().currentPlanId;
                // let currentPlan1 = null;

                //Now, that we have the productId assigned to the current user then
                //retrieve the plan details
                // IMPORTANT: To see how data is loaded from firestore: https://stackoverflow.com/questions/57887418/assigining-data-from-firestore-get-to-a-variable
                //In summary: we can access the doc.data() (i.e.: currentPlan1 = doc.data()) 
                //as long as it is inside this promise (then(...)), 
                //otherwise if we try to assign to a variable  and then want to access 
                //that variable just after the promise (outside then({...})), 
                //the data won't be accessible because firebase is asynchronous.
                db.collection('products')
                    .doc(productId)
                    .get()
                    .then(doc => {
                        const currentPlan = doc.data();
                        //This way, we can assign another property to the plan;
                        //however, It'd be more elegant to assing the new property as:
                        // "setCurrentPlan({ ...currentPlan, id: productId })"
                        // currentPlan.id = productId;
                        // console.log('Current plan id:, ', currentPlan.id)
                        setCurrentPlan(currentPlan)
                        //Add the id property to the currentPlan object
                        setCurrentPlan({ ...currentPlan, id: productId })
                        console.log('The doc retrieveeeed: ', doc.data());

                    })
                // setCurrentPlan(currentPlan1);
                console.log('The productId retrieved: ', querySnapshot.docs[0].data().productId)
                console.log('The current plan retrieved: ', currentPlan)
            })
    }, [])

    console.log('The Products---:', products);
    console.log('The current plan---: ', currentPlan);

    //At the moment we just pretend making a subscription simply 
    //by switching from one plan to another, and updating the currentPlan
    //property. We will not use Stripe to run mock subscription payments
    // since we need to upgrade our firebase account to blaze and it
    // is not neccessary to learn this firebase extension yet.
    const loadCheckout = async (productId, priceId, productName) => {
        //alert(productId)
        // alert(productName)
        let currentUserId;
        //we use await so that we can assign currentUserId inside the promise
        //and just after the promise acces its value. Without await, 
        //the currentUserId value would be undefined after the promise
        const docRef = await db.collection('customers')
            .where('email', '==', user.email)
            .get()
            .then(querySnapshot => {
                // querySnapshot.id;
                console.log('The current user id: ', querySnapshot.docs[0].id);
                currentUserId = querySnapshot.docs[0].id;
            });
        console.log('The X value: ', currentUserId);

        //Now set the current plan
        var currentUserRef = db.collection('customers').doc(currentUserId);
        const setWithMerge = currentUserRef.set({
            currentPlanId: productId,
            currentPlanPriceId: priceId,
        }, { merge: true });

        setWithMerge.then(() => {
            //We need to update the currentPlan and set it to the just subscribed plan. 
            //First we need to turn the products object into an array of products:
            //As we have defined above the productos object struture is as follows:
            //{prodId1:{name, description, active, price, prices}, prodId2:{name, description, active, price, prices}, prodId3:...}
            //Therefore, we first get the keys of the object which are the "ids", then we map then
            //and turn into an array of new objects as follows:
            const productsArray = Object.keys(products)
                .map(id => {
                    const product = products[id];
                    //Append the id to the new product object
                    product.id = id;
                    return product;
                });
            console.log('The products array: ', productsArray);

            //Now, we find the product by its id:
            const newSelectedPlan = productsArray.find(p => p.id == productId);
            console.log('The new selected plan:---', newSelectedPlan);

            //Finally, update the current plan
            setCurrentPlan(newSelectedPlan);

            //Open the modal and show the success message
            setModalMessage('You are now subscribed to ' + productName + ' plan.');
            handleOpen();


        }).catch((error) => {
            //alert('Error updating the document: ', error);
            setModalMessage('We couldnt update your plan. Please try again later.');
            console.log(error)
        })
    }

    // IMPORTANT: The styles and stylenames were implemented by myself.
    //Sonny's instructions were not followed since the day before I had
    //already anticipated implementing this component (in a static way)
    return (
        <div className='plansScreen'>
            <h3>{`Plans (Current Plan: ${currentPlan?.name})`}</h3>
            <h4>Renewal date: 09/04/2021</h4>
            {/* Since products is an object (and not an array), the way we
            map its properties is different than the way we map arrays:
            Object.entries() will give back an array which contains 
            an array of key-value pairs of the enumerable properties 
            of the object.
            Here, we are also destructurin the returned array properties as follows:
            productId is the automatic ID stored in the database, the productData corresponds
            to the product itself */}
            {Object.entries(products).map(([productId, productData]) => {
                //TODO: add some logic to check if the user subscriiption is active
                return (
                    <div className="plansScreen__plan">
                        <div className="plansScreen__planDescription">
                            <h2>{productData.name}</h2>
                            <h2>{productData.description}</h2>
                        </div>
                        <button onClick={() => loadCheckout(productId, productData.prices.priceId, productData.name)}
                            className="plansScreen__button">
                            Subscribe
                        </button>
                    </div>
                );
            })}
            {/* Static implementation made the day before: */}
            {/* <div className="plansScreen__plan">
                <div className="plansScreen__planDescription">

                    <h2>Netflix Standard</h2>
                    <h2>1080p</h2>
                </div>
                <button className="plansScreen__button">Subscribe</button>
            </div>
            <div className="plansScreen__plan">
                <div className="plansScreen__planDescription">
                    <h2>Netflix Premium</h2>
                    <h2>4k</h2>
                </div>
                <button className="plansScreen__button">Subscribe</button>
            </div> */}

            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className='plansScreen__modal'
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className='plansScreen__modalPaper'>
                        <h1>{modalMessage}</h1>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default PlansScreen
