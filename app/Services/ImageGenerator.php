<?php

namespace App\Services;

use Intervention\Image\Image;

/**
 * ImageGenerator.
 */
class ImageGenerator extends BaseService
{
    public function generate(
        int $value = self::VALUE_OPEN_COMMUNICATION,
        int $subtitle = 0,
        string $to = 'Dear Jane Doe',
        string $from = 'John Dow',
        string $challenge = 'Big challenge ahead',
        string $initiative = 'The action that make the difference',
        string $impact = 'Your action make the life of our customers easier'
    ) {
        // create a new image resource
        $image = \Image::make($this->defaultBackground);

        $valueItems = $this->values[$value];

        // Title
        $image = $this->drawText(
            $image,
            $valueItems['title'],
            $valueItems['titlePosition'][0],
            $valueItems['titlePosition'][1],
            $valueItems['titleFontSize'],
            '#fff'
        );

        // Subtitle
        $image = $this->drawText(
            $image,
            $valueItems['subtitle'][$subtitle],
            $valueItems['subtitlePosition'][0],
            $valueItems['subtitlePosition'][1],
            $valueItems['subtitleFontSize'],
            '#fff'
        );

        // To
        $image = $this->drawText($image, wordwrap($to, 20), 450, 2050, 110, '#a5f9fb');

        // From
        $image = $this->drawText($image, $from, 500, 2450, 80, '#fff');

        // Challenge
        $image = $this->drawText($image, wordwrap(substr($challenge, 0, 250), 55), 2350, 800, 80, '#fff');

        // Initiative
        $image = $this->drawText($image, wordwrap(substr($initiative, 0, 250), 55), 2350, 1650, 80, '#fff');

        // Impact
        $image = $this->drawText($image, wordwrap(substr($impact, 0, 250), 55), 2350, 2500, 80, '#fff');

        // output image data
        return (string) base64_encode($image->encode('jpg', 80)->encoded);
    }

    /**
     * @param Image  $image
     * @param string $text
     * @param int    $x_axis
     * @param int    $y_axis
     * @param int    $fontSize
     * @param string $fontColor
     *
     * @return Image
     */
    private function drawText(
        Image $image,
        string $text,
        int $x_axis,
        int $y_axis,
        int $fontSize,
        string $fontColor = '#fff'
    ): Image
    {
        $image->text($text, $x_axis, $y_axis, function ($font) use ($fontSize, $fontColor) {
            $font->file(app()->basePath() . "/public/{$this->defaultFont}");
            $font->size($fontSize);
            $font->color($fontColor);
            $font->valign('top');
        });

        return $image;
    }
}
