import Image from "next/image";

export default function RainbowJittat() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center">
        <span className="text-xl font-bold pt-4 bg-gradient-to-r  from-red-600 via-green-600 to-blue-600 text-transparent bg-clip-text bg-300% animate-gradient">
          ปลดล็อก Rainbow Kimslick!
        </span>
        <span className="text-sm pb-4 bg-gradient-to-r  from-red-600 via-green-600 to-blue-600 text-transparent bg-clip-text bg-300% animate-gradient">
          คะแนนของคุณเกิน 20% แล้ว!
        </span>
        <div className=" relative bg-cover h-auto w-fit">
          <Image
            src="https://static.rachatat.com/kimslick.png"
            width={200}
            height={200}
            alt="Handsome KimSlick"
            className="rounded-xl"
          ></Image>
          <div className=" rounded-xl animate-gradient bg-300% absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600 via-green-600 to-blue-600 opacity-40"></div>
        </div>
      </div>
    </>
  );
}
