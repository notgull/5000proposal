/*
 * datapad.tsx
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

import { DatapadEntry, Directives } from "./entry";
import { h, render, Component } from "preact";
import { LoadedFile } from "./loaded-file";

export interface DatapadProps {
  entries: Array<DatapadEntry | Directives>;
}

export interface DatapadState {
  currentEntry: DatapadEntry;
  currentIndex: number;
}

export class Datapad extends Component<DatapadProps, DatapadState> {
  innerRef: HTMLElement | null;

  constructor(props: DatapadProps) {
    super(props);

    this.innerRef = null;

    this.state = {
      currentEntry: this.props.entries[0] as DatapadEntry,
      currentIndex: 0
    };
  }

  updateInnerRef() {
    if (this.innerRef) {
      this.innerRef.innerHTML = "";
      console.log(this.state.currentEntry);
      this.innerRef.appendChild(this.state.currentEntry.element);
    }
  }

  setInnerRef(elem: HTMLElement | null) {
    this.innerRef = elem;
    this.updateInnerRef();
  }

  componentDidUpdate(prevProps: DatapadProps, prevState: DatapadState) {
    this.updateInnerRef();
  }

  render() {
    return (
      <div id="datapad">
        <p id="datapad-label-top">Pentagonix</p>
        <p id="datapad-label">DATAPAD</p>
        <LoadedFile name={this.state.currentEntry.fname} />
        <div class={this.state.currentEntry.classname} id="datapad-scroll-area" ref={this.setInnerRef.bind(this)} />
      </div>
    );
  }
}
