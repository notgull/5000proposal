/*
 * loaded-file.tsx
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

import { h, render, Component } from "preact";

export interface LoadedFileProps {
  name: string;
}

export interface LoadedFileState {
  curname: string;
  curtext: string;
  isStartOfAnimation: boolean;
}

const changeLetterDelay = 5;

// indicates the currently loaded file
export class LoadedFile extends Component<LoadedFileProps, LoadedFileState> {
  timeout: ReturnType<typeof setTimeout> | null;

  constructor(props: LoadedFileProps) {
    super(props);

    this.timeout = null;

    this.state = {
      curname: this.props.name,
      curtext: this.props.name,
      isStartOfAnimation: false
    }
  }

  // there is a text-cycling animation - run this when the name changes
  private operateTextChangeFrame() {
    if (this.state.curname === this.state.curtext) {
      return;
    }

    setTimeout(() => {
      this.setState((s: LoadedFileState): LoadedFileState => {
        let mutatableState = Object.assign({}, s);
 
        // if the curtext's length is zero, we need to start the next part of the animation
        if (mutatableState.curtext.length === 0) {
          mutatableState.isStartOfAnimation = false;
        }

        // at the start of the animation, delete letters
        let { curname, curtext } = mutatableState;
        if (mutatableState.isStartOfAnimation) {
          curtext = curtext.substring(0, curtext.length - 1);
        } else {
          curtext = curname.substring(0, curtext.length + 1);
        }
        mutatableState.curtext = curtext;

        return mutatableState;
      });

      // run the next frame
      this.operateTextChangeFrame();
    }, changeLetterDelay);
  }

  componentDidUpdate(prevProps: LoadedFileProps) {
    if (this.props.name !== prevProps.name) {
      this.setState((s: LoadedFileState): LoadedFileState => {
        return Object.assign({}, s, { curname: this.props.name, isStartOfAnimation: true });
      });

      this.operateTextChangeFrame();
    }
  }

  render() { 
    return (
      <table class="load-file-indicator">
        <tr>
          <td>Loaded</td>
          <td class="textbox">{this.state.curtext}</td>
        </tr>
      </table>
    );
  }
}
