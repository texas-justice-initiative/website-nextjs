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
import {
  RadioProvider,
  RadioGroup,
  Radio,
  useRadioStore,
} from '@ariakit/react';
import { useRouter } from 'next/navigation';

const initialOptions = {
  clientId:
    'AdjzG--Uaf6pzaZ0Z5Dec77AF8k0zsUTyVfjY3tl_w_5PcgP5ZYcNXu2bZupZV2ZLTUWYWmsvK26BnpK', // TJI Sandbox
  currency: 'USD',
  intent: 'capture',
};

function DonationForm() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const donationAmount = useRadioStore();
  const router = useRouter();
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );

  const handleCreateOrder = (data, actions) => {
    const value = donationAmount.getState().value;

    if (!value) {
      setError({
        field: 'amount',
        message: 'Please select an amount',
      });
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value,
            currency_code: 'USD',
            breakdown: {
              item_total: {
                value,
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
                value,
              },
              category: 'DONATION',
            },
          ],
        },
      ],
    });
  };

  const handleApprove = async (data, actions) => {
    router.push('/thanks');
  };

  return (
    <div>
      {isPending && <div className="spinner" />}
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          name="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          name="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <RadioGroup store={donationAmount}>
        <label className="label">
          <Radio className="radio" value="5" />
          $5
        </label>
        <label className="label">
          <Radio className="radio" value="10" />
          $10
        </label>
        <label className="label">
          <Radio className="radio" value="15" />
          $15
        </label>
        <label className="label">
          <Radio className="radio" value="25" />
          $25
        </label>
      </RadioGroup>
      {error?.field === 'amount' && (
        <p style={{ color: 'red' }}>{error.message}</p>
      )}

      <PayPalButtons
        fundingSource="paypal"
        style={{ layout: 'vertical', label: 'donate' }}
        // disabled={!donationAmount.getState().value}
        //   forceReRender={[style]}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
      />
    </div>
  );
}

export function Donate() {
  return (
    <>
      <Layout fullWidth flexColumn>
        <DonateHero title="Seize the Data" />
      </Layout>
      <Layout>
        <Primary>
          <PayPalScriptProvider options={initialOptions}>
            <DonationForm />
          </PayPalScriptProvider>
        </Primary>
      </Layout>
    </>
  );
}

export default Donate;
