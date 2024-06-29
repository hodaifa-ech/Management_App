<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoicePaid extends Notification implements ShouldQueue
{
    use Queueable;
    public $Post;

    /**
     * Create a new notification instance.
     */
    public function __construct($Post)
    {
        $this->Post = $Post;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)

            ->line($this->Post['title'])
            ->action('Notification Action', url('task/' . $this->Post['slug']))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {


        return [
            'user_id' => $this->Post['user_id'],
            'name' => $this->Post['user_name'],
        ];
    }
    public function toDatabase(object $notifiable)
    {
        return [
            'user_id' => $this->Post['user_id'],
            'name' => $this->Post['user_name'],
            'title' => $this->Post['title'],
            'slug' => $this->Post['slug'],
        ];
    }
}
