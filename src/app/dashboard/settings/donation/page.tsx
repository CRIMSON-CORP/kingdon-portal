import Image from "next/image";

function page() {
  return (
    <div className="relative bg-white rounded-[20px] border border-[#e7e7e7] py-11 px-12 flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-medium">Make a donation</h2>
        <p className="text-sm font-light">
          Donate to support our mission, below are some options you can use to
          donate.
        </p>
      </header>
      <div className="flex flex-col gap-7">
        <h3 className="text-sm font-medium">Payment Method</h3>
        <form className="flex flex-col gap-24">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <div className="flex items-center gap-5 justify-between">
              <div className="flex item-center gap-2.5">
                <Image
                  src="/img/paypal.png"
                  width={30}
                  height={30}
                  alt="paypal"
                />
                <div className="flex flex-col">
                  <p className=" text-sm font-medium ">Pay with Paypal</p>
                  <p className="text-[10px] font-light">
                    You will be redirected to Paypal
                  </p>
                </div>
              </div>
              <input type="radio" name="payment-method" value="paypal" />
            </div>
            <div className="flex items-center gap-5 justify-between">
              <div className="flex item-center gap-2.5">
                <Image
                  src="/img/flutterwave.png"
                  width={30}
                  height={30}
                  alt="paypal"
                />
                <div className="flex flex-col">
                  <p className=" text-sm font-medium ">Pay with Flutterwave</p>
                  <p className="text-[10px] font-light">
                    You will be redirected to Flutterwave
                  </p>
                </div>
              </div>
              <input type="radio" name="payment-method" value="flutterwave" />
            </div>
            <div className="flex items-center gap-5 justify-between">
              <div className="flex item-center gap-2.5">
                <Image
                  src="/img/paystack.png"
                  width={30}
                  height={30}
                  alt="paypal"
                />
                <div className="flex flex-col">
                  <p className=" text-sm font-medium ">Pay with Paystack</p>
                  <p className="text-[10px] font-light">
                    You will be redirected to Paystack
                  </p>
                </div>
              </div>
              <input type="radio" name="payment-method" value="flutterwave" />
            </div>
          </div>
          <button className="p-4 bg-[#2967b3] rounded text-white text-sm font-semibold ml-auto max-w-[203px] w-full">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
