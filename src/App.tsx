import React, { useState, useEffect } from 'react';
import './App.css';
import { LiaEuroSignSolid } from "react-icons/lia";
import { calculateDeliveryFee } from './feeCalculator';

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orderDateTime, setOrderDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const now = new Date();
    setOrderDateTime(now);
  }, []);

  const handleCartValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d.]/g, '');
    setCartValue(parseFloat(inputValue));
  };

  const handleDeliveryDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d]/g, '');
    setDeliveryDistance(parseInt(inputValue));
  };

  const handleNumberOfItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d]/g, '');
    setNumberOfItems(parseInt(inputValue));
  };

  const handleOrderDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = new Date(event.target.value);
    setOrderDateTime(newDateTime);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const fee = calculateDeliveryFee(cartValue, deliveryDistance, numberOfItems, orderDateTime);
    setDeliveryFee(fee);
  };

  const isCalculateDisabled = () => {
    return !cartValue || !deliveryDistance || !numberOfItems;
  };

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="container-full">
      <header className="header">
        <h1 className='title'>Delivery Fee Calculator</h1>
      </header>
      <div className="main-content mt-5">
        <div className="mat-card">
          <form onSubmit={handleSubmit}>
            <div className='form-group row'>
              <div className="col-sm-2 col-3">
                <span className="material-icons icon-large">shopping_cart</span>
              </div>
              <div className="col-sm-4 col-5">
                <label htmlFor="cartValue">Cart value (<LiaEuroSignSolid />):</label>
              </div>
              <div className="col-sm-6 col-4">
                <input type="number" step="0.01" className="form-control" id="cartValue" value={cartValue === 0 ? '' : cartValue} onChange={handleCartValueChange} data-test-id="cartValue" placeholder="Add cart value" />
              </div>
            </div>
            <div className='form-group row'>
              <div className="col-sm-2 col-3">
                <span className="material-icons icon-large">local_shipping</span>
              </div>
              <div className="col-sm-4 col-5">
                <label htmlFor="deliveryDistance">Delivery distance (m):</label>
              </div>
              <div className="col-sm-6 col-4">
                <input type="number" className="form-control" id="deliveryDistance" value={deliveryDistance === 0 ? '' : deliveryDistance} onChange={handleDeliveryDistanceChange} data-test-id="deliveryDistance" placeholder="Add delivery distance" />
              </div>
            </div>
            <div className='form-group row'>
              <div className="col-sm-2 col-3">
                <span className="material-icons icon-large">receipt_long</span>
              </div>
              <div className="col-sm-4 col-5">
                <label htmlFor="numberOfItems">Number of items:</label>
              </div>
              <div className="col-sm-6 col-4">
                <input type="number" className="form-control" id="numberOfItems" value={numberOfItems === 0 ? '' : numberOfItems} onChange={handleNumberOfItemsChange} data-test-id="numberOfItems" placeholder='Add amount of items' />
              </div>
            </div>
            <div className='form-group row'>
              <div className="col-sm-2 col-3">
                <span className="material-icons icon-large">date_range</span>
              </div>
              <div className="col-sm-4 col-5">
                <label htmlFor="orderDateTime">Order date & time:</label>
              </div>
              <div className="col-sm-6 col-4">
                <input type="datetime-local" className="form-control" id="orderDateTime" value={formatDateForInput(orderDateTime)} onChange={handleOrderDateTimeChange} />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-12 text-center">
                <button className='btn btn-primary' type="submit" disabled={isCalculateDisabled()}>{isCalculateDisabled() ? "Calculate" : "Calculate"}</button>
              </div>
            </div>
          </form>
          <div className="delivery-fee row">
            <label htmlFor="delivery-fee-label">Delivery Fee:</label>
            <p className="delivery-fee-value" data-test-id="fee">{cartValue >= 200 ? 0 : deliveryFee.toFixed(2)} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;