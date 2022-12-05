import { useContext, useState } from "react";
import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import Button from "../button/button.component"
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import './payment-form-styles.scss'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#ffffff",
			color: "#ffffff",
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
            width: '100%',
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const PaymentForm = () => {

    const stripe = useStripe()
    const element = useElements()
    const { cartTotal } = useContext(CartContext)
    const { currentUser } = useContext(UserContext)


    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !element) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: cartTotal * 100 })
        }).then(res => res.json())

        const clientSecret = response.paymentIntent.client_secret

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.email : 'Guest'
                }
            }
        });


        if (paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('payment successful')
            }
        }
    }

    return (
        <div className="payment-form-container">
            <div className="form-container">
                <h2>Debit/Credit Card Payments:</h2>
                <CardElement options={CARD_OPTIONS} className='card-details' />
                <Button onClick={paymentHandler}>Pay Now</Button>
            </div>
        </div>
    )
}

export default PaymentForm;