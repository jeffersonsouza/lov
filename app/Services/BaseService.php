<?php

namespace App\Services;

class BaseService
{
    public const VALUE_OPEN_COMMUNICATION = 0;
    public const VALUE_STRIVE_FOR_SUCCESS = 1;
    public const VALUE_DELIVER_WOW = 2;
    public const VALUE_ON_THE_MISSION = 3;
    public const VALUE_WE_ARE_HUMAN = 4;

    protected $defaultBackground = 'living-our-values.png';
    protected $defaultFont = 'OldSansBlack.ttf';

    protected $values = [
        [
            'title' => "WE BELIEVE \nIN OPEN \nCOMMUNICATION",
            'subtitle' => [
                "We respect each other \nand always talk \nat eye level",
                "We embrace a strong \nculture of feedback",
                "We communicate \nopenly and clearly",
                "We have an effective \nmeeting culture",
                "We rely on proactive \ncommunication, \ninternally and externally",
                "We share work results \nand successes and make \nthem accessible to everyone",
            ],
            'titlePosition' => [400, 800],
            'titleFontSize' => 150,
            'subtitlePosition' => [400, 1400],
            'subtitleFontSize' => 120,
        ],
        [
            'title' => "WE STRIVE \nFOR \nSUCCESS",
            'subtitle' => [
                "We minimize our \neffort for the \nbest possible result",
                "We turn today’s \nno into tomorrow’s yes",
                "We take intelligent \nrisks and make \nfast decisions",
                "We work smart \nand find new ways",
                "We convince through \nresults rather \nthan working time",
                "We motivate each \nother to reach the sky",
            ],
            'titlePosition' => [400, 800],
            'titleFontSize' => 150,
            'subtitlePosition' => [400, 1400],
            'subtitleFontSize' => 120,
        ],
        [
            'title' => "WE \nDELIVER \n„WOW“",
            'subtitle' => [
                "We belief \nin the simple, \nnot in the complex",
                "We love it minimalistic \nand beautifully \ndesigned",
                "We live our brand \nidentity in everyday \ninteraction",
                "We thrill through \nhigh quality \nand innovation",
                "We work in a structured \nand reliable manner",
                "We achieve outstanding \nresults through our \ncustomer-centric approach",
            ],
            'titlePosition' => [400, 800],
            'titleFontSize' => 150,
            'subtitlePosition' => [400, 1400],
            'subtitleFontSize' => 105,
        ],
        [
            'title' => "WE ARE \nON „THE \nMISSION“",
            'subtitle' => [
                "We are using \nour resources \nintelligently",
                "We always stay positive \nand see chances and \nnot the problems",
                "We quickly adapt to \nsituations, focus on solutions \nand use it for our advantage",
                "We have the courage \nto say “no” to \nunimportant topics",
                "We set high goals \nfor ourselves and achieve \nthem step by step",
                "We always seek advice \nin our Strategy Playbook \nand team members",
            ],
            'titlePosition' => [400, 800],
            'titleFontSize' => 150,
            'subtitlePosition' => [400, 1400],
            'subtitleFontSize' => 100,
        ],
        [
            'title' => "WE ARE \nHUMAN",
            'subtitle' => [
                "We are empathic \nand build trust",
                "We accept failure, \nshare our learnings \nopenly and learn from it",
                "We are curious and \nencourage each other \nto be open and creative",
                "We trust in our \nteam and leave our \ncomfort zone together",
                "We ask for guidance \nwhen we are unsure",
            ],
            'titlePosition' => [400, 800],
            'titleFontSize' => 200,
            'subtitlePosition' => [400, 1400],
            'subtitleFontSize' => 120,
        ],
    ];
}
