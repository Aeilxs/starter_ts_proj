
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tweet Template</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <template id="tweet-template">
      <div class="tweet-container">
        <div class="user-info">
          <img class="avatar" src="" alt="User Avatar" />
          <div class="user-details">
            <span class="name"></span>
            <span class="username"></span>
          </div>
        </div>
        <div class="tweet-content"></div>
        <div class="tweet-actions">
          <span class="action reply">🔄</span>
          <span class="action retweet">🔁</span>
          <span class="action like">❤️</span>
          <span class="action share">🔗</span>
        </div>
      </div>
    </template>
    <h1>helloss ssss</h1>
    <script src="main.js" type="module"></script>
  </body>
</html>
```

J'ai également le CSS.

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f5f8fa;
  margin: 0;
  padding: 20px;
}

.tweet-container {
  background-color: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
  color: #1d1d1d;
}

.username {
  color: #657786;
  font-size: 0.9em;
}

.tweet-content {
  margin-bottom: 10px;
  color: #14171a;
}

.tweet-actions {
  display: flex;
  justify-content: space-around;
  font-size: 1.2em;
}

.tweet-actions .action {
  cursor: pointer;
  color: #1da1f2;
}

.tweet-actions .action:hover {
  color: #0d95e8;
}
```
