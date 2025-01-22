// Observer interface, What do I want to say to the Sub? the reason of the types's parameter
interface Observer {
    update(message: string): void;
}

// Concrete subscriber class
class Subscriber implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    update(message: string): void {
        console.log(`${this.name} received notification: ${message}`);
    }
}

// Subject interface
class Subject {
    private subscribers: Observer[] = [];

    attach(observer: Observer): void {
        this.subscribers.push(observer);
    }

    detach(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer);
    }

    notify(message: string): void {
        this.subscribers.forEach(subscriber => subscriber.update(message));
    }
}

// Concrete subject class
class PostOffice extends Subject {
    private posts: string[] = [];

    addPost(post: string): void {
        this.posts.push(post);
        this.notify(`New post available: ${post}`);
    }
}

// Example usage
const postOffice = new PostOffice();

// Create subscribers
const alice = new Subscriber("Alice");
const bob = new Subscriber("Bob");
const carol = new Subscriber("Carol");

// Attach subscribers to the post office
postOffice.attach(alice);
postOffice.attach(bob);

// Add a new post
postOffice.addPost("Postcard from Paris");

// Detach a subscriber and add another post
postOffice.detach(bob);
postOffice.addPost("Holiday Sale Announcement");

// Attach another subscriber
postOffice.attach(carol);
postOffice.addPost("Package delivery update");
