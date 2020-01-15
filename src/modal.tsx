/*
 * modal.tsx
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

import { h, Component } from "preact";

export interface ModalProps {
  cancel: () => void;
  volume: (x: number) => void;
}

export interface ModalState {
  r: number;
  g: number;
  b: number;
  a: number;  
  musicVolume: number;
}

const aIncrement = 0.01;
const aFrames = 10;
const cTimes = 5;
const cDelay = 1005;

export class Modal extends Component<ModalProps, ModalState> {
  rSection: number;
  gSection: number;
  bSection: number;

  constructor(props: ModalProps) {
    super(props);

    this.state = {
      r: 255,
      g: 106,
      b: 250,
      a: 0,
      musicVolume: 1
    };

    this.rSection = this.state.r / cTimes;
    this.gSection = this.state.g / cTimes;
    this.bSection = this.state.b / cTimes; 
  }

  updateColor() {
    if (this.state.r <= 0 && this.state.g <= 0 && this.state.b <= 0) {
      this.props.cancel();
      const jBody = $("body");
      jBody.css("background-color", "black");
      jBody.empty();
      $("<div>").appendTo(jBody).attr("id", "attributions").text("TODO: attributions");
      return;
    }

    this.setState((prevState: ModalState) => {
      let newR = prevState.r - this.rSection;
      let newG = prevState.g - this.gSection;
      let newB = prevState.b - this.bSection;
      if (newR < 0) newR = 0;
      if (newG < 0) newG = 0;
      if (newB < 0) newB = 0;
 
      let volume = prevState.musicVolume - (1 / cTimes);
      volume = volume > 0 ? volume : 0;
      this.props.volume(volume);

      return Object.assign({}, prevState, {
        r: newR,
        g: newG,
        b: newB,
        musicVolume: volume
      });
    }, () => setTimeout(this.updateColor.bind(this), cDelay));
  }

  updateAlpha() {
    if (this.state.a >= 1.0) { 
      setTimeout(this.updateColor.bind(this), cDelay);
      return;
    }

    this.setState((prevState: ModalState) => {
      return Object.assign({}, prevState, {
        a: prevState.a + aIncrement
      });
    }, () => setTimeout(this.updateAlpha.bind(this), aFrames));
  }

  componentDidMount() {
    this.updateAlpha();
  }

  render() {
    const modalStyle = {
      "background-color": `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a}`
    };
 
    return (
      <div id="modal" style={modalStyle}></div>
    );
  }
}
