import { Component, h, State } from '@stencil/core';
import { APIService } from '../../services/api';
import { LivingOurValues } from '../../types/living-our-values';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true,
})
export class AppHome {
  /**
   * @type {string}
   */
  @State() error: string[] = [];
  @State() request = { sending: false };
  @State() image: string;

  @State() formControls: LivingOurValues = {
    value: null,
    subtitle: null,
    to: null,
    from: null,
    challenge: null,
    initiative: null,
    impact: null,
  };

  @State() subtitles = [];

  componentWillLoad() {

  }

  updateFormValue(controlName, value) {
    this.formControls = {
      ...this.formControls,
      [controlName]: value
    };
  }

  selectValue(value: number) {
    if(value === this.formControls.value) {
      return;
    }

    this.formControls = {...this.formControls, ...{value: value}};
    this.subtitles = [...APIService.initialValues[value].subtitles];
    this.formControls.subtitle = null;
  }

  selectSubtitle(value: number) {
    this.formControls = {...this.formControls, ...{subtitle: value}};
  }

  async generateImage(event) {
    event.preventDefault();
    this.error = [...[]];

    if(!this.formControls.value || !this.formControls.subtitle) {
      this.error = [...this.error, ...['You need to choose the Value and the Principle']];
      return;
    }

    try {
      this.request = {...this.request, sending: true};
      this.image = await APIService.create(this.formControls);
      this.request = {...this.request, sending: false};
    } catch (error) {
      this.request = {...this.request, sending: false};
      this.error = [...this.error, ...[error.error || 'Unknown error']];
    }
  }

  resetForm() {
    this.formControls = {
      value: null,
      subtitle: null,
      to: null,
      from: null,
      challenge: null,
      initiative: null,
      impact: null,
    };

    this.subtitles = [...[]];
  }

  render() {
    return [
      <ion-content class="ion-padding">
        <header>
          <img src="assets/hb-logo.png" alt="Hotelbird" width="150"/>
        </header>


        <section>
          <form onSubmit={(event) => this.generateImage(event)}>
            <ion-grid>
              <ion-row>
                <ion-col>
                    <h3>What is the <strong>Value</strong> that you want to write about?</h3>
                  <div class="flex">
                    <ul class="value-title">
                      {APIService.initialValues?.map((value, index) =>
                        <li class={ this?.formControls?.value == index ? 'selected' : null}
                            onClick={() => this.selectValue(index)}
                        >{value?.title}</li>
                      )}
                    </ul>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row class={this.subtitles.length == 0 ? 'hidden' : null}>
                <ion-col>
                  <h3>What is the <strong>Principle</strong> you want to write about?</h3>
                  <div class="flex">
                    <ul class="value-subtitle">
                      {this.subtitles?.map((subtitle, index) =>
                        <li class={ this?.formControls?.subtitle == index ? 'selected' : null}
                            onClick={() => this.selectSubtitle(index)}
                        >{subtitle}</li>
                      )}
                    </ul>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="4" sizeMd="6">
                  <div>
                    <label htmlFor="to">To:</label> <br/>
                    <input type="text" class="input" id="to" placeholder="For whom do you want to write?" required
                           maxlength="50"
                           value={this.formControls?.to} onInput={(ev: any) =>
                      this.updateFormValue("to", ev.target.value)
                    } />
                  </div>
                </ion-col>
                <ion-col size="4" sizeMd="6">
                  <div>
                    <label htmlFor="from">Author:</label><br/>
                    <input type="text" class="input" id="from" placeholder="Your name..." required
                           maxlength="25"
                           value={this.formControls?.from} onInput={(ev: any) =>
                      this.updateFormValue("from", ev.target.value)
                    } />
                  </div>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="3" sizeMd="4">
                  <div>
                    <label htmlFor="challenge">What was the Challenge?</label> <br/>
                    <textarea class="input textarea" id="to" placeholder="Describe in a few words what was the challenge..." required
                           value={this.formControls?.challenge} onInput={(ev: any) =>
                      this.updateFormValue("challenge", ev.target.value)
                    }></textarea>
                  </div>
                </ion-col>
                <ion-col size="3" sizeMd="4">
                  <div>
                    <label htmlFor="initiative">What was the Impact that this action caused?</label> <br/>
                    <textarea class="input textarea" id="to" placeholder="Describe in a few words what was the impact..." required
                              value={this.formControls?.initiative} onInput={(ev: any) =>
                      this.updateFormValue("initiative", ev.target.value)
                    }></textarea>
                  </div>
                </ion-col>
                <ion-col size="3" sizeMd="4">
                  <div>
                    <label htmlFor="impact">What was the Impact that this action caused?</label> <br/>
                    <textarea class="input textarea" id="to" placeholder="Describe in a few words what was the impact..." required
                              value={this.formControls?.impact} onInput={(ev: any) =>
                      this.updateFormValue("impact", ev.target.value)
                    }></textarea>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <div class={this.request?.sending ? 'spinner' : 'hidden'}>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  </div>
                  <div class={this.error.length > 0 ? 'error-box' : 'hidden'}>
                    { this.error[0] }
                  </div>
                  <div class="submit-button">
                    <ion-button type="submit" size="large" fill="outline">
                      <ion-icon slot="start" name="image"></ion-icon> {this.image ? 'Re-' : null}Generate Image
                    </ion-button>
                    <ion-button download={'living-our-values-' + (new Date()).getTime() +  '.jpg'}
                                href={'data:image/jpg;base64,' + this.image}
                                size="large"
                                fill="outline"
                                class={!this.image ? 'hidden' : null}
                    >
                      <ion-icon slot="start" name="download"></ion-icon>Download Image
                    </ion-button>
                    <ion-button type="button" size="large" fill="clear" class={!this.image ? 'hidden' : null}
                                onClick={() => this.resetForm()}>
                      <ion-icon slot="start" name="image"></ion-icon>Reset Form
                    </ion-button>
                  </div>
                </ion-col>
              </ion-row>
              <ion-row class={!this.image ? 'hidden' : null}>
                <ion-col class="generated-image">
                  <a download={'living-our-values-' + (new Date()).getTime() +  '.jpg'}
                     href={'data:image/jpg;base64,' + this.image}>
                    <img src={'data:image/jpg;base64,' + this.image}  alt=""/>
                  </a>
                </ion-col>
              </ion-row>
            </ion-grid>
          </form>
        </section>
      </ion-content>,
    ];
  }
}
