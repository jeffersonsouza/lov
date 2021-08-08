import { environment } from '../global/environment';
import { LivingOurValues } from '../types/living-our-values';

export class APIService {

  /**
   * @type {string}
   * @private
   */
  private static resourceEndpoint = `${environment.apiUrl}/`;

  /**
   * @type {{'Content-Type': string}}
   * @private
   */
  private static headers = {
    'Content-Type': 'application/json'
  };

  static initialValues: {title: string; subtitles: string[]}[] = [
    {
      title: 'We believe in open communication',
      subtitles: [
        "We respect each other and always talk at eye level",
        "We embrace a strong culture of feedback",
        "We communicate openly and clearly",
        "We have an effective meeting culture",
        "We rely on proactive communication, internally and externally",
        "We share work results and successes and make them accessible to everyone",
      ],
    },
    {
      title: 'We strive for success',
      subtitles: [
        "We minimize our effort for the best possible result",
        "We turn today’s no into tomorrow’s yes",
        "We take intelligent risks and make fast decisions",
        "We work smart and find new ways",
        "We convince through results rather than working time",
        "We motivate each other to reach the sky",
      ],
    },
    {
      title: 'We deliver „wow“',
      subtitles: [
        "We belief in the simple, not in the complex",
        "We love it minimalistic and beautifully designed",
        "We live our brand identity in everyday interaction",
        "We thrill through high quality and innovation",
        "We work in a structured and reliable manner",
        "We achieve outstanding results through our customer-centric approach",
      ],
    },
    {
      title: 'We are on „the mission“',
      subtitles: [
        "We are using our resources intelligently",
        "We always stay positive and see chances and not the problems",
        "We quickly adapt to situations, focus on solutions and use it for our advantage",
        "We have the courage to say “no” to unimportant topics",
        "We set high goals for ourselves and achieve them step by step",
        "We always seek advice in our Strategy Playbook and team members",
      ],
    },
    {
      title: 'We are human',
      subtitles: [
        "We are empathic and build trust",
        "We accept failure, share our learnings openly and learn from it",
        "We are curious and encourage each other to be open and creative",
        "We trust in our team and leave our comfort zone together",
        "We ask for guidance when we are unsure",
      ],
    },
  ];

  /**
   * Create new Living Our Value Image
   *
   * @param {LivingOurValues } livingOurValues
   * @returns {Promise<void>}
   */
  static async create(livingOurValues: LivingOurValues): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(this.resourceEndpoint, {
          method: 'POST',
          body: JSON.stringify(livingOurValues),
          headers: this.headers,
        });

        const json = await response.json();
        resolve(json.image);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

}
