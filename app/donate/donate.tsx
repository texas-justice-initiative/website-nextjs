'use client';

import Layout from '@/components/Layout';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import DonateHero from '@/components/DonateHero';
import Primary from '@/components/Primary';

const initialOptions = {
  clientId:
    'AZ2LDJwEbuFjH45Izqk5pmxHtyzxtooUPBCrvrn7tjKXIbv-xGxXsflhCMGl6dy2tRBEliztwiPzCckc',
  currency: 'USD',
  intent: 'capture',
};

function ButtonWrapper() {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        fundingSource="paypal"
        style={{ layout: 'vertical', label: 'donate' }}
        disabled={false}
        //   forceReRender={[style]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '2',
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      value: '2',
                      currency_code: 'USD',
                    },
                  },
                },
                items: [
                  {
                    name: 'donation-example',
                    quantity: '1',
                    unit_amount: {
                      currency_code: 'USD',
                      value: '2',
                    },
                    category: 'DONATION',
                  },
                ],
              },
            ],
          });
        }}
        //   onApprove={onApprove}
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
            <ButtonWrapper />
          </PayPalScriptProvider>
        </Primary>
      </Layout>
    </>
  );
}

export default Donate;
