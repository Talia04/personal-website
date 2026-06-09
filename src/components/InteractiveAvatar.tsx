/// <reference types="vite/client" />
import { useEffect, useRef } from "react";
import avatarHoverImage from "../assets/tanya-avatar-hover.jpg";
import "./InteractiveAvatar.css";

// No division lines — smooth hair only

const HAIR_MASS = `M275 124
  C341 118 393 146 418 207
  C438 252 430 282 437 310
  C444 338 428 365 434 394
  C440 423 421 450 419 478
  C422 534 407 558 398 608
  L152 608
  C143 558 128 534 131 478
  C129 450 110 423 116 394
  C122 365 106 338 113 310
  C120 282 112 252 132 207
  C157 146 209 118 275 124 Z`;

const FACE_PATH = `M184 267
  C181 224 187 191 204 170
  C216 158 228 168 241 160
  C251 153 261 159 272 159
  C283 159 293 153 303 160
  C316 168 328 158 341 170
  C358 191 366 224 363 267
  L364 326
  C360 382 330 419 285 444
  C277 449 267 449 259 444
  C214 419 184 382 183 326 Z`;

export function InteractiveAvatar() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tgt={x:0,y:0},cur={x:0,y:0},vel={x:0,y:0};
    let px=0,py=0,lastMove=0,frame=0,prevT=performance.now();
    let swayPhase=0,idlePhase=0;
    let photoTimer=0;
    let pointerOverAvatar=false;

    const set=(n:string,v:number,u="px")=>root.style.setProperty(n,`${v.toFixed(3)}${u}`);
    const setT=(x:number,y:number)=>{tgt.x=Math.max(-1,Math.min(1,x));tgt.y=Math.max(-1,Math.min(1,y));lastMove=performance.now();};
    const onMove=(e:PointerEvent)=>{const r=root.getBoundingClientRect();setT((e.clientX-(r.left+r.width/2))/(window.innerWidth*.42),(e.clientY-(r.top+r.height*.42))/(window.innerHeight*.42));};
    const onLeave=()=>setT(0,0);
    const onOrient=(e:DeviceOrientationEvent)=>{if(e.gamma==null||e.beta==null)return;setT(e.gamma/28,(e.beta-45)/38);};
    const hidePhoto=()=>root.classList.remove("is-photo-visible");
    const schedulePhoto=()=>{
      window.clearTimeout(photoTimer);
      if (!pointerOverAvatar) return;
      photoTimer=window.setTimeout(()=>root.classList.add("is-photo-visible"),200);
    };
    const onAvatarEnter=(event:PointerEvent)=>{
      if (event.pointerType !== "mouse") return;
      pointerOverAvatar=true;hidePhoto();schedulePhoto();
    };
    const onAvatarMove=(event:PointerEvent)=>{
      if (event.pointerType !== "mouse") return;
      hidePhoto();schedulePhoto();
    };
    const onAvatarLeave=()=>{pointerOverAvatar=false;window.clearTimeout(photoTimer);hidePhoto();};

    let nextBlink = performance.now() + 2400 + Math.random() * 2200;
    let blinkStart = -1;
    let doubleBlink = false;
    const ease = (value:number) => value * value * (3 - 2 * value);
    const blinkValue = (now:number, offset:number) => {
      if (blinkStart < 0) return 0;
      const progress = (now - blinkStart - offset) / 260;
      if (progress <= 0 || progress >= 1) return 0;
      if (progress < .38) return ease(progress / .38);
      if (progress < .52) return 1;
      return 1 - ease((progress - .52) / .48);
    };

    const update=(now:number)=>{
      const dt=now-prevT;prevT=now;
      cur.x+=(tgt.x-cur.x)*.075;cur.y+=(tgt.y-cur.y)*.075;
      vel.x=cur.x-px;vel.y=cur.y-py;px=cur.x;py=cur.y;
      const vm=Math.sqrt(vel.x**2+vel.y**2),x=cur.x,y=cur.y;
      set("--avatar-tilt-x",y*-2.2,"deg");set("--avatar-tilt-y",x*3,"deg");
      set("--avatar-glow-x",x*-13);set("--avatar-glow-y",y*-9);
      set("--avatar-back-x",x*-9);set("--avatar-back-y",y*-7);
      set("--avatar-body-x",x*-1);set("--avatar-body-y",y*-1);
      const idle=Math.min(1,Math.max(0,(now-lastMove-2000)/1200));
      idlePhase+=dt*.00088;
      set("--avatar-breathe",1+Math.sin(idlePhase*Math.PI*2)*.003*idle,"");
      set("--avatar-head-drift",0,"");
      set("--avatar-head-x",x*4);set("--avatar-head-y",y*3);
      set("--avatar-head-rotate",x*.8,"deg");
      set("--avatar-features-x",x*7);set("--avatar-features-y",y*5);
      const expressionWave=Math.sin(idlePhase*Math.PI*2);
      const expressionCounter=Math.sin((idlePhase+.34)*Math.PI*2);
      set("--avatar-brow-left-y",y*1.4-x*1.5+expressionWave*.65*idle);
      set("--avatar-brow-right-y",y*1.4+x*1.5+expressionCounter*.65*idle);
      set("--avatar-brow-left-rotate",x*-1.8+expressionWave*.45*idle,"deg");
      set("--avatar-brow-right-rotate",x*-1.8+expressionCounter*.45*idle,"deg");
      set("--avatar-mouth-y",y*.9+expressionWave*.4*idle);
      set("--avatar-mouth-rotate",x*.65,"deg");
      set("--avatar-mouth-scale",1-y*.018+expressionCounter*.006*idle,"");
      // The white eye interiors track together and stay clipped inside each eye.
      const eyeX=Math.max(-9,Math.min(9,x*9)), eyeY=Math.max(-7,Math.min(7,y*7));
      set("--avatar-eye-x",eyeX);set("--avatar-eye-y",eyeY);
      set("--avatar-foreground-x",x*10);set("--avatar-foreground-y",y*7);
      set("--avatar-status-x",x*-8);set("--avatar-status-y",y*-5);
      const amp=3.5*(0.3+0.7*idle)+3.5*Math.min(1,vm*18)*.4;
      swayPhase+=dt*.00042;
      set("--avatar-hair-x",x*-3+Math.sin(swayPhase*Math.PI*2)*amp*.3);
      set("--avatar-hair-y",y*-2);
      if (blinkStart < 0 && now >= nextBlink) {
        blinkStart = now;
        doubleBlink = Math.random() < .2;
      }
      const primaryLeft = blinkValue(now, 0);
      const primaryRight = blinkValue(now, 24);
      const secondaryLeft = doubleBlink ? blinkValue(now, 330) : 0;
      const secondaryRight = doubleBlink ? blinkValue(now, 354) : 0;
      set("--avatar-blink-l",Math.max(primaryLeft,secondaryLeft),"");
      set("--avatar-blink-r",Math.max(primaryRight,secondaryRight),"");
      const blinkEnd = blinkStart + (doubleBlink ? 620 : 300);
      if (blinkStart >= 0 && now > blinkEnd) {
        blinkStart = -1;
        nextBlink = now + 2800 + Math.random() * 3800;
      }
      frame=window.requestAnimationFrame(update);
    };

    window.addEventListener("pointermove",onMove,{passive:true});
    document.documentElement.addEventListener("pointerleave",onLeave);
    window.addEventListener("deviceorientation",onOrient,{passive:true});
    root.addEventListener("pointerenter",onAvatarEnter);
    root.addEventListener("pointermove",onAvatarMove);
    root.addEventListener("pointerleave",onAvatarLeave);
    frame=window.requestAnimationFrame(update);
    return()=>{
      window.removeEventListener("pointermove",onMove);
      document.documentElement.removeEventListener("pointerleave",onLeave);
      window.removeEventListener("deviceorientation",onOrient);
      root.removeEventListener("pointerenter",onAvatarEnter);
      root.removeEventListener("pointermove",onAvatarMove);
      root.removeEventListener("pointerleave",onAvatarLeave);
      window.clearTimeout(photoTimer);
      window.cancelAnimationFrame(frame);
    };
  },[]);

  return (
    <div ref={rootRef} className="interactive-avatar" role="img" aria-label="Interactive illustrated portrait of Tanya Chisepo" tabIndex={0}>
      <div className="interactive-avatar-glow" aria-hidden="true"/>
      <svg viewBox="0 0 540 640" aria-hidden="true">
        <defs>
          <linearGradient id="avatar-frame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a8d500" stopOpacity=".55"/>
            <stop offset=".5" stopColor="#8f6cff" stopOpacity=".18"/>
            <stop offset="1" stopColor="#e589ff" stopOpacity=".5"/>
          </linearGradient>
          <linearGradient id="avatar-skin" x1=".15" y1="0" x2=".85" y2="1">
            <stop offset="0" stopColor="#b85a36"/>
            <stop offset=".5" stopColor="#a34828"/>
            <stop offset="1" stopColor="#7e2e1e"/>
          </linearGradient>
          <linearGradient id="avatar-shirt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7f2e9"/>
            <stop offset="1" stopColor="#bfc9c8"/>
          </linearGradient>
          <linearGradient
            id="avatar-hair-ombre"
            gradientUnits="userSpaceOnUse"
            x1="275"
            y1="82"
            x2="275"
            y2="730"
            colorInterpolation="sRGB"
          >
            <stop offset="0" stopColor="#09080c"/>
            <stop offset=".54" stopColor="#1c1412"/>
            <stop offset=".8" stopColor="#4b3425"/>
            <stop offset="1" stopColor="#876744"/>
          </linearGradient>
          <filter id="avatar-hair-dither" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="8" result="noise"/>
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 .025 0"
              result="grain"
            />
            <feBlend in="SourceGraphic" in2="grain" mode="soft-light"/>
          </filter>
          <filter id="avatar-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#020205" floodOpacity=".65"/>
          </filter>
          <filter id="avatar-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9"/>
          </filter>
          <clipPath id="avatar-frame-clip">
            <path d="M55 610 V196 C55 95 137 32 238 32 H302 C403 32 485 95 485 196 V610 Z"/>
          </clipPath>
          <clipPath id="avatar-hair-clip">
            <path d={HAIR_MASS}/>
          </clipPath>
          <clipPath id="avatar-eye-left-clip">
            <circle cx="222" cy="290" r="18"/>
          </clipPath>
          <clipPath id="avatar-eye-right-clip">
            <circle cx="322" cy="290" r="18"/>
          </clipPath>
        </defs>

        <path className="avatar-frame" d="M55 610 V196 C55 95 137 32 238 32 H302 C403 32 485 95 485 196 V610"/>
        <g clipPath="url(#avatar-frame-clip)">
          <rect className="avatar-backdrop" x="55" y="32" width="430" height="578"/>
          <circle className="avatar-orb avatar-orb-one" cx="135" cy="178" r="92"/>
          <circle className="avatar-orb avatar-orb-two" cx="417" cy="272" r="116"/>
          <path className="avatar-grid-line" d="M55 472 H485 M55 518 H485 M101 32 V610 M439 32 V610"/>

          <g className="avatar-hair-group" filter="url(#avatar-shadow)">
            <path className="avatar-hair-mass" d={HAIR_MASS} filter="url(#avatar-hair-dither)"/>
            <g className="avatar-braid-lines" clipPath="url(#avatar-hair-clip)">
              <path d="M168 604 C160 578 176 552 163 526 C151 499 168 472 156 445 C144 418 160 391 151 364 C143 337 158 308 162 256 C169 194 190 151 224 134"/>
              <path d="M205 608 C197 579 211 552 198 524 C187 499 202 472 193 445 C184 418 198 391 191 364 C184 337 196 304 201 242 C208 183 231 145 258 124"/>
              <path d="M335 608 C343 579 329 552 342 524 C353 499 338 472 347 445 C356 418 342 391 349 364 C356 337 344 304 339 242 C332 183 309 145 282 124"/>
              <path d="M372 604 C380 578 364 552 377 526 C389 499 372 472 384 445 C396 418 380 391 389 364 C397 337 382 308 378 256 C371 194 350 151 316 134"/>
            </g>
            <path className="avatar-hair-sheen" d="M149 558 C142 536 153 516 140 492 C128 468 143 442 132 416 C121 390 137 364 128 338 C120 312 132 286 136 260 C142 202 160 164 188 144"/>
            <path className="avatar-hair-sheen" d="M401 558 C408 536 397 516 410 492 C422 468 407 442 418 416 C429 390 413 364 422 338 C430 312 418 286 414 260 C408 202 390 164 362 144"/>
          </g>

          <g className="avatar-layer avatar-body">
            <path className="avatar-shirt" d="M83 640 C91 573 139 538 218 520 H322 C402 538 451 573 460 640 Z"/>
            <path className="avatar-shirt-shadow" d="M83 640 C112 583 164 560 221 549 C237 578 294 590 324 548 C385 560 432 587 460 640 Z"/>
            <path className="avatar-neck" d="M220 400 C222 448 218 495 200 524 C224 560 316 562 340 524 C322 494 320 448 324 400 Z"/>
            <path className="avatar-neck-shadow" d="M222 416 C248 440 292 444 322 414 C320 448 318 478 328 506 C294 526 246 522 214 502 C222 472 222 446 222 416 Z"/>
          </g>

          <g className="avatar-layer avatar-head">
            <ellipse className="avatar-ear" cx="179" cy="304" rx="12" ry="25"/>
            <ellipse className="avatar-ear" cx="365" cy="304" rx="12" ry="25"/>
            <path className="avatar-face" d={FACE_PATH}/>
            <path className="avatar-face-shadow" d="M329 166 C356 192 367 231 363 267 L364 326 C359 382 329 423 282 448 C314 410 331 369 332 313 Z"/>
            <ellipse className="avatar-cheek avatar-cheek-left" cx="211" cy="334" rx="27" ry="14"/>
            <ellipse className="avatar-cheek avatar-cheek-right" cx="333" cy="334" rx="27" ry="14"/>
          </g>

          <g className="avatar-layer avatar-features">
            {/* Brows — short thick near-horizontal */}
            <path className="avatar-brow avatar-brow-left" d="M192 248 C204 242 222 241 236 246"/>
            <path className="avatar-brow avatar-brow-right" d="M300 246 C316 241 334 242 346 248"/>
            {/* Eyes — white interiors track within clipped black eye shapes */}
            <circle className="avatar-eye-circle" cx="222" cy="290" r="18"/>
            <circle className="avatar-eye-circle" cx="322" cy="290" r="18"/>
            <g clipPath="url(#avatar-eye-left-clip)">
              <circle className="avatar-eye-inner" cx="229" cy="283" r="6"/>
            </g>
            <g clipPath="url(#avatar-eye-right-clip)">
              <circle className="avatar-eye-inner" cx="329" cy="283" r="6"/>
            </g>
            {/* Upper eyelids hinge down over the eyes */}
            <path className="avatar-lid avatar-lid-left" d="M202 271 Q222 260 242 271 C243 286 243 299 241 309 Q222 315 203 309 C201 299 201 286 202 271 Z"/>
            <path className="avatar-lid avatar-lid-right" d="M302 271 Q322 260 342 271 C343 286 343 299 341 309 Q322 315 303 309 C301 299 301 286 302 271 Z"/>
            <path className="avatar-lid-crease avatar-lid-crease-left" d="M204 309 Q222 315 240 309"/>
            <path className="avatar-lid-crease avatar-lid-crease-right" d="M304 309 Q322 315 340 309"/>
            {/* Nose */}
            <path className="avatar-nose" d="M268 306 C263 322 264 336 274 342"/>
            {/* Mouth */}
            <path className="avatar-mouth" d="M242 385 C258 399 288 400 310 386"/>
          </g>

          <g className="avatar-layer avatar-foreground-light">
            <path d="M125 545 C211 509 337 510 425 554"/>
          </g>
          <image
            className="avatar-hover-photo"
            href={avatarHoverImage}
            x="55"
            y="32"
            width="430"
            height="578"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <span className="interactive-avatar-label">Cursor reactive / Tanya</span>
      <span className="interactive-avatar-status" aria-hidden="true"><i/> Tracking</span>
    </div>
  );
}
