/*
 * index.tsx
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

import { h, render } from "preact";
import { Header } from "./header";

import * as $ from "jquery";

import "./style.scss";

$(() => {
  const root = document.getElementById("root"); 
 
  if (root) {
    render(
      <div style="width: 100%">
        <Header />
        <div id="main-body">
          <h1>Army Emerges from Ruins, takes New Tanston City and Borough City, threatens to take world</h1>
          <h2>by Christopher Arch</h2>
          <hr />
          <p>It was a surprise to the entire world when a signal was broadcasted from the bottom of the New Pacific Ocean&#8212; in encoding that hadn't been seen for hundreds of years. It was another surprise when an island suddenly appeared where that signal had been sent from. As of two hours ago, the world has recieved another surprise in the form of the sudden military conquest of two port cities.</p>
          <p>The original appearance of the signal.</p>
        </div>
      </div>
    ,root);
  }
});
