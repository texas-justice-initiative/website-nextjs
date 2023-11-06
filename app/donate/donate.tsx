'use client';

import Layout from '@/components/Layout';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import DonateHero from '@/components/DonateHero';
import Primary from '@/components/Primary';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './donate.module.scss';
import classNames from 'classnames';
import MarkdownIt from 'markdown-it';
import Sidebar from '@/components/Sidebar';

const md = new MarkdownIt();

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_TJI_PAYPAL || '',
  currency: 'USD',
  intent: 'capture',
};

function DonationForm() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [amount, setAmount] = useState<number>(5);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );

  // TODO: type this
  const handleCreateOrder = (data: any, actions: any) => {
    if (!amount || amount === 0) {
      setError({
        field: 'amount',
        message: 'Please select an amount',
      });

      return;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: 'USD',
            breakdown: {
              item_total: {
                value: amount,
                currency_code: 'USD',
              },
            },
          },
          items: [
            {
              name: 'One time donation',
              quantity: '1',
              unit_amount: {
                currency_code: 'USD',
                value: amount,
              },
              category: 'DONATION',
            },
          ],
        },
      ],
    });
  };

  const handleFixedDonation = (donation: number) => {
    setShowCustom(false);
    setAmount(donation);
  };

  const handleCustomDonation = () => {
    setShowCustom(true);
    setAmount(0);
  };

  return (
    <div className={styles['form']}>
      {isPending && <div className="spinner" />}
      <div className={styles['form-row']}>
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          name="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          name="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div
        className={classNames({
          [styles['donation-row']]: true,
          [styles['form-row']]: true,
        })}
      >
        <button
          type="button"
          className={classNames({
            [styles['donation-button']]: true,
            [styles['selected']]: !showCustom && amount === 5,
          })}
          onClick={() => handleFixedDonation(5)}
        >
          $5
        </button>
        <button
          type="button"
          className={classNames({
            [styles['donation-button']]: true,
            [styles['selected']]: !showCustom && amount === 10,
          })}
          onClick={() => handleFixedDonation(10)}
        >
          $10
        </button>
        <button
          type="button"
          className={classNames({
            [styles['donation-button']]: true,
            [styles['selected']]: !showCustom && amount === 25,
          })}
          onClick={() => handleFixedDonation(25)}
        >
          $25
        </button>
        <button
          type="button"
          className={classNames({
            [styles['donation-button']]: true,
            [styles['selected']]: showCustom,
          })}
          onClick={handleCustomDonation}
        >
          Custom
        </button>
      </div>

      {showCustom && (
        <div className={styles['form-row']}>
          <input
            type="number"
            min={1}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className={styles['custom-donation']}
          />
          {error?.field === 'amount' && (
            <p style={{ color: 'red' }}>{error.message}</p>
          )}
        </div>
      )}

      <div className={styles['form-row']}>
        <PayPalButtons
          fundingSource="paypal"
          style={{ layout: 'vertical', label: 'donate' }}
          disabled={!amount || amount === 0}
          createOrder={handleCreateOrder}
          forceReRender={[amount]}
          className={styles['submit-button']}
        />
      </div>
    </div>
  );
}

export function Donate(props: { content: any }) {
  const { content } = props;

  const {
    html,
    attributes: { title },
  } = content;

  return (
    <>
      <Layout fullWidth flexColumn>
        <DonateHero title="Seize the Data" />
      </Layout>
      <Layout>
        <Primary>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <PayPalScriptProvider options={initialOptions}>
            <DonationForm />
          </PayPalScriptProvider>
        </Primary>
        <Sidebar />
      </Layout>
    </>
  );
}

export default Donate;
