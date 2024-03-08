/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4gQ42McBSuc
 */
"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/component/footer";
import Link from "next/link";

import { login } from "@/lib/actionLogin";
import { useFormState, useFormStatus } from "react-dom";
import Chart from "@/components/component/donut-2";
import RainbowJittat from "@/components/component/rainbow-jittat";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "..." : "Login"}
    </Button>
  );
}

export default function LoginPage() {
  const refreshPage = () => {
    window.location.reload();
  };

  const initState = {
    message: "",
    myName: "",
    myNontriID: "",
    maxNormalPercent: 0,
    maxOptionalPercent: 0,
    myNormalPercent: 0,
    myOptionalExceed: 0,
    myOptionalPercent: 0,
    myleftOverScore: 0,
    myScoreToDoLeft: 0,
    totalscore: 0,
    myCurrentScore: 0,
    countNormal: 0,
    mySumScoreNormal: 0,
  };

  const [state, formAction] = useFormState(login, initState);

  const chartData = [
    { name: "A", value: state.myNormalPercent, color: "#756AB6" },
    { name: "B", value: state.myOptionalExceed, color: "#AC87C5" },
    {
      name: "C",
      value:
        state.myOptionalPercent >= state.maxOptionalPercent
          ? state.maxOptionalPercent
          : state.myOptionalPercent,
      color: "#E0AED0",
    },
    {
      name: "D",
      value: state.myleftOverScore,
      color: "#FFE5E5",
    },
  ];

  return (
    <>
      {state.message != "Success" ? (
        <div className=" overflow-hidden relative">
          <div className="animate-fade-up animate-ease-out flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="mx-auto max-w-sm space-y-6">
              <div className=" space-y-2 text-center">
                <h1 className="text-3xl font-bold">WOI-Grader Score</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  คะแนนเก็บใน Grader ตอนนี้คุณมีเท่าไร?
                  เราจะช่วยนับคะแนนให้เอง
                </p>
              </div>
              <div className="space-y-4">
                <form action={formAction}>
                  <div className="space-y-2">
                    <Label htmlFor="username">posnwu.xyz Account</Label>
                    <Input name="username" placeholder="wucom23_xx" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      placeholder="password ตามที่อาจารย์ให้"
                      required
                      type="password"
                    />
                  </div>
                  <div className="pt-4">
                    <SubmitButton />
                    {/* <Button className="w-full" type="submit">
                      Login
                    </Button> */}
                  </div>
                </form>
                <Link
                  className="inline-block w-full text-center text-sm underline"
                  href="https://www.instagram.com/rbunpat"
                >
                  เจอบัคหรอ? แจ้งมาเลย 🥹
                </Link>

                {state.message == "" ? (
                  <div></div>
                ) : (
                  <div>Message : {state?.message}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs font-normal p-4  text-gray-400 max-w-sm mx-auto w-full absolute bottom-20  left-0 right-0">
            *จำนวนข้อที่ทำแล้วอาจคลาดเคลื่อนเล็กน้อยเนื่องจากอาจมีข้อที่ส่งไปแล้วแต่ยังไม่ได้คะแนน
          </div>
          <div className=" w-full">
            <footer className="w-full p-4  text-center bg-gray-200 dark:bg-gray-700 absolute bottom-0">
              <p className="text-gray-600 dark:text-gray-300">
                {`We don't collect any of your data cuz we're lazy`}
                {/* <Link
                  className="text-blue-500 underline"
                  href="https://github.com/rbunpat/my-probsolve-score"
                >
                  GitHub
                </Link> */}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {`Thanks for the original code, inzpirezuza!`}
                <Link
                  className="text-blue-500 underline"
                  href="https://github.com/inspirezuza/my-probsolve-score"
                >
                  GitHub
                </Link>
              </p>
            </footer>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col min-h-screen  bg-gray-100 ">
            <header className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-[#333]">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                POSN-2566 Grader Score
              </h1>
              <Link href={"/"}>
                <Button
                  onClick={refreshPage}
                  className="text-gray-900 dark:text-gray-100"
                  variant="outline"
                >
                  Logout
                </Button>
              </Link>
            </header>
            <div className="animate-fade-up animate-ease-out flex-1 overflow-y-auto">
              {" "}
              {/* This enables vertical scrolling */}
              <div className="flex flex-col items-center justify-center p-10">
                <div className="mx-auto max-w-sm space-y-6">
                  <div className="space-y-2 text-center">
                    <h1 className="pt-8 text-3xl font-bold">Your Score</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      ID: {state.myNontriID}
                    </p>
                    <div className="p-4">
                      <Chart data={chartData} />
                    </div>
                    <div className="pt-4 text-xl font-bold">
                      Grader Score:{" "}
                      <p className="font-normal">
                        {/* {Math.round(state.myNormalPercent * 10) / 10} + */}
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 inline-block">
                          {state.myCurrentScore}
                        </p>
                        /{state.totalscore}
                      </p>
                    </div>
                    <div className="pt-4 text-xl font-bold">
                      ทำไปแล้ว:{" "}
                      <p className="font-normal">
                        {/* {Math.round(state.myNormalPercent * 10) / 10} + */}
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 inline-block">
                          {state.submittedCount}
                        </p>
                        /{state.countNormal}
                        &nbsp;ข้อ
                      </p>
                    </div>
                    <div className="pt-4 text-xl font-bold">
                      ได้คะแนนเต็ม:{" "}
                      <p className="font-normal">
                        {/* {Math.round(state.myNormalPercent * 10) / 10} + */}
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 inline-block">
                          {state.fullScoreCount}
                        </p>
                        /{state.countNormal}
                        &nbsp;ข้อ
                      </p>
                    </div>
                    <div className="">
                      <div className="text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hidden">
                        <div className="font-extrabold ">Optional Score: </div>
                        <p className="font-normal">
                          {Math.round(state.myOptionalPercent * 10) / 10}/
                          {state.maxOptionalPercent}
                        </p>
                      </div>
                      {state.myleftOverScore <= 0 ? (
                        <div>
                          <p className="text-sm font-normal ">
                            คะแนนของคุณเกินมา {-state.myScoreToDoLeft} คะแนน!
                          </p>
                          <p className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-md font-normal">
                            เก่งมาก {state.myName}!
                          </p>

                          <div className="flex justify-center items-center p-4">
                            <RainbowJittat />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className=" text-sm font-normal text-gray-500 dark:text-gray-400">
                            คุณต้องทำอีก {state.myScoreToDoLeft} คะแนน สู้ๆ!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="w-full p-4  text-center bg-gray-200 dark:bg-gray-700 bottom-0">
              <p className="text-gray-600 dark:text-gray-300">
                {`We don't collect any of your data cuz we're lazy`}

              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {`Thanks for the original code, inzpirezuza!  `}
                <Link
                  className="text-blue-500 underline"
                  href="https://github.com/inspirezuza/my-probsolve-score"
                >
                  GitHub
                </Link>
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
