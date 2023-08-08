export interface ICoinbaseCharge {
  addresses: [];
  brand_color: string;
  code: string;
  created_at: string;
  expires_at: string;
  description: string;
  fee_rate: number;
  fees_settled: boolean;
  pwcb_only: boolean;
  offchain_eligible: boolean;
  hosted_url: string;
  logo_url: string;
  exchange_rates: [];
  local_exchange_rates: [];
  payments: [];
  id: string;
  name: string;
  pricing_type: string;
  organization_name: string;
  support_email: string;
  metadata: object;
  utxo: boolean;
}

export interface ICoinbaseEvent {
  id: string;
  resource: string;
  type: string;
  api_version: string;
  created_at: string;
  data: {
    code: string;
    id: string;
    resource: string;
    name: string;
    description: string;
    hosted_url: string;
    created_at: string;
    expires_at: string;
    support_email: string;
    timeline: [
      {
        time: string;
        status: string;
      },
    ];
    /**
     * Optional key value pairs for your own use.
     */
    metadata?: KeyVal | undefined;
    pricing_type: string;
    payments: [];
  };
}

/**
 * Fiat currency.
 */
type FiatCurrency = 'USD' | 'GBP' | 'EUR' | string;

/**
 * Crypto currency.
 */
type CryptoCurrency = 'BTC' | 'ETH' | 'BCH' | 'LTC' | 'USDC';

/**
 * Price object.
 */
interface Price<Currency = CryptoCurrency | FiatCurrency> {
  amount: string;
  currency: Currency;
}

/**
 * Pricing type.
 */
type PricingType = 'no_price' | 'fixed_price';

/**
 * Key-value object.
 */
interface KeyVal {
  [key: string]: any;
}

/**
 * Base charge properties.
 */
export interface CreateChargeDTO {
  /**
   * Charge name.
   * 100 characters or less.
   */
  name: string;

  /**
   * Pricing type
   */
  pricing_type: 'fixed_price';

  /**
   * Local price in fiat currency.
   */
  local_price: Price<FiatCurrency>;

  /**
   * More detailed description of the charge.
   * 200 characters or less.
   */
  description: string;

  /**
   * Optional key value pairs for your own use.
   */
  metadata?: KeyVal | undefined;

  /**
   * Redirect the user to this URL on completion.
   */
  redirect_url?: string | undefined;

  /**
   * Redirect the user to this URL on cancel.
   */
  cancel_url?: string | undefined;
}
