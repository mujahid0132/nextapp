import { useState, useRef, useEffect } from "react";
import gsap from 'gsap'
// let inter = Inter({ subsets: ['latin'] })
// import '@/styles/globals.css'
export default function Home() {

  let tl = gsap.timeline()

  let bgrotatable = useRef(null);
  let content = useRef(null);
  let [side, setside] = useState(true); //true is firstside and false is second side
  let [zindex, setzindex] = useState(true);
  let animationtime = 2000; //in milliseconds
  let timetoreloadnextpage = 2;
  let gotosidetwo = () => {
    tl
      .to(".box", { scale: 0.8, duration: 0.5 })
      .to(".box", { rotateY: 90, duration: 0.4 })
      .to(".box", { rotateY: 180, duration: 2 , delay: timetoreloadnextpage})
      .to(".loader",{ opacity: 0, duration: 0.2 },timetoreloadnextpage)
      .to(".box", { scale: 1, duration: 0.1, ease: "power4.out" })
      .to(".secondelement", { scale: 10, duration: 1, ease: "power4.out" })

  };
  let changeside = () => {
    side ? setside(false) : setside(true);
    bgrotatable.current.style.animation = side
      ? gotosidetwo()
      : `animationsidechange-reverse ${animationtime}ms forwards`;
    setTimeout(() => {
      side ? setzindex(false) : setzindex(true);
    }, animationtime / 2);
  }


  // useEffect(() => {
  // tl.to(".box", { x: 200 })
  //   .to(".box", { y: 200 },0.1)
  // }, [])

  return (
    <>
    <div className="w-full h-screen flex items-center justify-center">

    <div className="w-20 aspect-square rounded-full border-t border-t-black animate-spin loader"></div>
    </div>
      <button
        onClick={changeside}
        className="border border-black overflow-hidden px-4 py-2 rounded-full capitalize transition-all duration-500 absolute top-10 right-10 z-50"
      >
        go to {side ? "second" : "first"} side
      </button>

      <div
        ref={bgrotatable}
        className={`h-screen w-full fixed top-0 left-0 overflow-hidden box`}
      >
        <div
          className={`${zindex ? "z-10" : "-z-10"
            } absolute h-full w-full bg-pink-500`}
        >
          first
        </div>
        <div
          className={`${zindex ? "-z-10" : "z-10"
            } absolute h-full w-full bg-blue-600 flex items-center justify-center`}
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* <span className=" uppercase font-extrabold text-5xl opacity-0 secondelement">
          second
          </span> */}
          <span className="w-10 aspect-square rounded-full bg-green-500 secondelement">
          </span>

        </div>
      </div>
    </>
  )
}
