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

const blue = "#eaefff";
const red = "#ff00de";
let jBody: JQuery;
function backgroundFlicker(chances: number) {
  let rng = Math.random();
  if (rng < chances / 1000) {
    jBody.css("background-color", red);
    setTimeout(remainder, 500);
  } else {
    jBody.css("background-color", blue);
    remainder();
  }

  function remainder() {
    rng = Math.random();
    if (rng < chances / 10000) {
      $("img").attr("src", "fifth.jpg");
    }

    rng = Math.random();
    let newChances = chances;
    if (rng > 0.991) {
      newChances += 1;
    }

    setTimeout(() => backgroundFlicker(newChances), 10);
  }
}

let alreadyBegun = false;
export function doPhenomena() {
  if (alreadyBegun) {
    return;
  } else {
    alreadyBegun = true;
  }

  jBody = $("body");

  backgroundFlicker(0);
}
