<?php
namespace App\Model\Entity;

use Core\Model\Entity\Entity;

class TracksEntity extends Entity
{
    public function __construct()
    {
        if (isset($this->id)) {
            $realTime = $this->getTimeDuration($this->duration);

            $this->time_duration = $realTime['m'] . ':' . $realTime['s'];
        }
    }

    public function getTimeDuration($seconds)
    {
        $hours               = floor($seconds / (60 * 60));
        $divisor_for_minutes = $seconds % (60 * 60);
        $minutes             = floor($divisor_for_minutes / 60);
        $divisor_for_seconds = $divisor_for_minutes % 60;
        $seconds             = ceil($divisor_for_seconds);

        $obj = [
            'h' => (int)$hours,
            'm' => (int)$minutes,
            's' => (int)$seconds,
        ];

        return $obj;
    }
}