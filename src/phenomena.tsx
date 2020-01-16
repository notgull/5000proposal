/*
 * phenomena.tsx
 * 
 * Copyright (c) 2019, not_a_seagull
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as $ from "jquery";
import { h, render } from "preact";
import { Modal } from "./modal";

let cancelled = false;
const music = new Audio("scary_music_cut.mp3");
let timeout: any;

function doCancel() {
  cancelled = true;
  music.pause();
  clearTimeout(timeout);
}

function setVolume(vol: number) {
  music.volume = vol;
}

const blue = [234, 239, 255];
const red = [255, 0, 222];
const sliderIters = 5;
let jBody: JQuery;

function backgroundSlider(next: () => void) {
  const rIter = (red[0] - blue[0])/sliderIters;
  const gIter = (red[1] - blue[1])/sliderIters;
  const bIter = (red[2] - blue[2])/sliderIters;

  let r = blue[0], g = blue[1], b = blue[2];
  function iter(iternum: number) {
    if (iternum >= 10) {
      next();
      return;
    }
 
    if (iternum < 5) {
      r += rIter;
      g += gIter;
      b += bIter;
    } else {
      r -= rIter;
      g -= gIter;
      b -= bIter;
    }

    jBody.css("background-color", `rgb(${r}, ${g}, ${b})`);
    timeout = setTimeout(() => iter(iternum + 1), 100);
  }
  iter(0); 
}

function backgroundFlicker(chances: number) {
  if (cancelled) return;

  let rng = Math.random();
  if (rng < chances / 1000) {
    music.play();
    backgroundSlider(remainder);
  } else {
    remainder();
  }

  function remainder() {
    rng = Math.random();
    if (rng < chances / 10000) {
      $("img").attr("src", "fifth.jpg");
  
      setTimeout(fifthify, 555 * 5);
    }

    rng = Math.random();
    let newChances = chances;
    if (rng > 0.991) {
      newChances += 1;
    }

    setTimeout(() => backgroundFlicker(newChances), 10);
  }
}

function fifthify() {
  $("body").find("p").each((index: number, el: HTMLElement) => {
    const wordCount = el.innerHTML.split(" ").length;
    let fifth = Array(wordCount);
    fifth.fill("fifth");
    el.innerHTML = fifth.join(" ");
  });

  setTimeout(doModal, 555 * 2);
}

let alreadyModal = false;

function doModal() {
  if (alreadyModal) {
    return;
  } else {
    alreadyModal = true;
  }

  const modalRoot = $("<div>").css({
    "z-index": 2,
    width: "100%",
    height: "20000px",
    position: "absolute",
    "top": 0,
    left: 0
  }).appendTo(document.body);  
  render(<Modal cancel={doCancel} volume={setVolume} />, modalRoot.get(0));
}

let alreadyBegun = false;
export function doPhenomena() {
  if (alreadyBegun) {
    return;
  } else {
    alreadyBegun = true;
  }

  setTimeout(() => {
    jBody = $("body");
    backgroundFlicker(0);
  }, 5555);
}
