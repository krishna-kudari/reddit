type Comment = {
  created_at: DateTime;
  id: !ID;
  post_id: ID;
  text: String;
  username: String;
};

type Post = {
  body: String;
  created_at: DateTime;
  id: !ID;
  image: String;
  subreddit_id: ID;
  title: String;
  username: String;
  comments: Comment[];
  votes: Vote[];
  subreddit: Subreddit[];
}

type Subreddit = {
  created_at: DateTime;
  topic: !String;
  id: !ID;
}

type Vote = {
  created_at: DateTime;
  id: !ID;
  post_id: ID;
  upvote: Boolean;
  username: String;
}
