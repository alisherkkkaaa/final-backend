const profileLink = document.getElementById("profileLink")
const postLink = document.getElementById("postLink")
const profileName = document.getElementById("profileName")
const content = document.getElementById("content")
const addcontent = document.getElementById("add-content")
const followersContainer = document.getElementById("followersContainer")
const subscribersContainer = document.getElementById("subscribersContainer")
const closeButton = document.querySelector(".close-btn");
const addPostContainer = document.getElementById("addPostContainer")
const accSettingContainer = document.getElementById("accSettingContainer")
const followersList = document.getElementById("followersList")
const subscribersList = document.getElementById("subscribersList")
const allusersContainer = document.getElementById("allusersContainer")
const allusersList = document.getElementById("allusersList")
fetch("/username")
    .then(response => response.json())
    .then(user => {
        const profileDisplay = document.getElementById('usernameDisplay')
        profileDisplay.innerHTML = `${user.username}`
    })
    .catch(error => console.error('Error:', error))

fetch("/profile")
    .then(response => response.json())
    .then(user => {
        fetch(`/followers/${user.id}`).then(response => response.json()).then(followerCount => {
            fetch(`/followees/${user.id}`).then(response => response.json()).then(followeeCount => {
                
                content.innerHTML =`<div class="user-content">
                                        <div class="pngg">
                                            <img src="/materials/ss.png">
                                        </div>
                                        <div class="user-info">
                                            <h2>${user.username}</h2>
                                            <div class="follower-following">
                                                <button class="follower-following-button" id="followersButton">${followerCount} Followers</button>
                                                <button class="follower-following-button" id="subscribersButton">${followeeCount} Subscribers</button>
                                                <button class="follower-following-button" id="allButton">All</button>
                                            </div>
                                            <button class="acc-stng-btn" id="accSettingButton">Account Settings</button>
                                        </div>
                                    </div>`;
            }).catch(error => console.error('followee fetching error', error))
        }).catch(error => console.error('follower fetching error', error))
        
    })
    .catch(error => console.error('profile fetching error:', error))

    fetch("/post/posts/id")
    .then(response => response.json())
    .then(posts => {
        addcontent.innerHTML = '';
        const contentBlock = document.createElement("div")
        contentBlock.classList.add("content-block")
        posts.forEach(post => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
            contentBlock.innerHTML += ` <div class="post-block">
                                            <h3>${post.title}</h3>
                                            <p>${post.description}</p>
                                            <p class="post-user-info">${formattedDate}</p>
                                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                        </div>`
            addcontent.appendChild(contentBlock)
        });
        const addPost = document.createElement("button")
        addPost.classList.add("add-post")
        addPost.innerHTML = '+'
        addcontent.appendChild(addPost)
    })
    .catch(error => {console.error(error)})


function profileLinkClick(event) {
    event.preventDefault();
    fetch("/profile")
    .then(response => response.json())
    .then(user => {
        fetch(`/followers/${user.id}`).then(response => response.json()).then(followerCount => {
            fetch(`/followees/${user.id}`).then(response => response.json()).then(followeeCount => {
                
                content.innerHTML =`<div class="user-content">
                                        <div class="pngg">
                                            <img src="/materials/ss.png">
                                        </div>
                                        <div class="user-info">
                                            <h2>${user.username}</h2>
                                            <div class="follower-following">
                                                <button class="follower-following-button" id="followersButton">${followerCount} Followers</button>
                                                <button class="follower-following-button" id="subscribersButton">${followeeCount} Subscribers</button>
                                                <button class="follower-following-button" id="allButton">All</button>
                                            </div>
                                            <button class="acc-stng-btn" id="accSettingButton">Account Settings</button>
                                        </div>
                                    </div>`;
            }).catch(error => console.error('followee fetching error', error))
        }).catch(error => console.error('follower fetching error', error))
        
    })
    .catch(error => console.error('profile fetching error:', error))
    addcontent.style.display = "block"
    fetch("/post/posts/id")
    .then(response => response.json())
    .then(posts => {
        addcontent.innerHTML = '';
        const contentBlock = document.createElement("div")
        contentBlock.classList.add("content-block")
        posts.forEach(post => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
            contentBlock.innerHTML += ` <div class="post-block">
                                            <h3>${post.title}</h3>
                                            <p>${post.description}</p>
                                            <p class="post-user-info">${formattedDate}</p>
                                            <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
                                            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                                        </div>`
            addcontent.appendChild(contentBlock)
        });
        const addPost = document.createElement("button")
        addPost.classList.add("add-post")
        addPost.innerHTML = '+'
        addcontent.appendChild(addPost)
    })
    .catch(error => {console.error(error)})
}

async function getUserId() {
    const response = await fetch('/profile')
    const user = await response.json()
    return user.id
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('#allButton')) {
        event.preventDefault();
        fetch('/users/all')
            .then(response => response.json())
            .then(async users => {
                const loggedId = await getUserId();
                users.forEach(user => {
                    fetch(`/follows/${user.id}/${loggedId}`)
                    .then(response => response.json())
                    .then(data => {
                        const isFollowing = data;
                        allusersList.innerHTML += ` <div class="follow-item-list">
                                                        <p>${user.username}</p>
                                                        <button class="follow-buton" onclick="handleFollowButtonClick('${user.id}', '${loggedId}')">
                                                        ${isFollowing ? 'Unfollow' : 'Follow'}
                                                        </button>
                                                    </div>`
                    }).catch(error => console.error(error))
                })
            }).catch(error => console.error(error))
        allusersContainer.style.display = "block";
    }
    if (target.matches('#followersButton')) {
        event.preventDefault();
        fetch('/followers')
        .then(response => response.json())
        .then(followers => {
            followers.forEach(follower => {
                fetch(`/user/${follower.follower_id}`).then(response => response.json()).then(user => {
                    followersList.innerHTML += `<div class="follow-item-list">
                                                    <p>${user.username}</p>
                                                    <button class="follow-button" onclick="followUser('${follower.follower_id}')">Follow</button>
                                                </div>`
                })
            })
        })
        console.log("f button clicked")
        followersContainer.style.display = "block";
        
    }
    if (target.matches('#subscribersButton')) {
        event.preventDefault();
        fetch('/followees')
        .then(response => response.json())
        .then(followees => {
            followees.forEach(followee => {
                fetch(`/user/${followee.followee_id}`).then(response => response.json()).then(user => {
                    subscribersList.innerHTML += `  <div class="follow-item-list">
                                                        <p>${user.username}</p>
                                                        <button class="follow-button" onclick="unfollowUser('${followee.followee_id}')">Unfollow</button>
                                                    </div>`
                })
            })
        })
        console.log("s button clicked")
        subscribersContainer.style.display = "block";
    }
    if (target.matches('.add-post')) {
        addPostContainer.style.display ="block"
    }
    if (target.matches('.close-btn')) {
        allusersList.innerHTML = '';
        followersList.innerHTML = '';
        subscribersList.innerHTML = '';
        accSettingContainer.style.display = "none"
        addPostContainer.style.display ="none"
        subscribersContainer.style.display ="none";
        followersContainer.style.display = "none";
        allusersContainer.style.display = "none";
    }
    if(target.matches('#addNewPost')){
        const title = document.getElementById("newTitle").value
        const description = document.getElementById("newDescription").value
        addNewPost(title, description);
        addPostContainer.style.display = "none"
    }
    if (target.matches('#accSettingButton')) {
        accSettingContainer.style.display = "block"
    }
    if (target.matches('#updateUser')) {
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        updateUser(username, email, password)
    }
});

function handleFollowButtonClick(followerId,followeeId) { 
    console.log(followerId + " " + followeeId) 
    const followButton = document.querySelector(".follow-button") 
    fetch(`/follows/${followerId}/${followeeId}`) 
        .then(response => response.json()) 
        .then(data => { 
            const isFollowing = data 
            if (isFollowing) { 
                unfollowUser(followerId) 
                    .then(() => { 
                    followButton.innerText = 'Follow'; 
                  }) 
                  .catch(error => { 
                    console.error('Error unfollowing user:', error); 
                  }); 
              } else { 
                followUser(followerId) 
                  .then(() => { 
                    followButton.innerText = 'Unfollow'; 
                  }) 
                  .catch(error => { 
                    console.error('Error following user:', error); 
                  }); 
              } 
        }) 
        .catch(error => console.error(error)); 
} 
   
 
function followUser(followeeId) { 
    return fetch('/follows/follow', { 
        method: 'POST', 
        body: JSON.stringify({ followeeId: followeeId }), 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    }) 
    .then(response => response.json()) 
    .catch(error => { 
        throw error; 
    }); 
} 
   
function unfollowUser(followeeId) { 
    return fetch('/follows/unfollow', { 
        method: 'POST', 
        body: JSON.stringify({ followeeId: followeeId }), 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    }) 
    .then(response => response.json()) 
    .catch(error => { 
        throw error; 
    }); 
}


async function addNewPost(title, description){
    const response = await fetch('/post/add', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
     });
    if(response.ok) {
        alert("Post added successfully")
    } else {
        alert(`Addition failed`);
    }
}   

async function updateUser(newusername, newemail, newpassword) {
    fetch('/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: newusername,
          email: newemail,
          password: newpassword
        })
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Successfully updated');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function postLinkClick(event) {
    event.preventDefault();
    addcontent.style.display = "none";
    fetch("/post/posts")
        .then(response => response.json())
        .then(posts => {

            content.innerHTML = '';
            const contentBlock = document.createElement("div")
            contentBlock.classList.add("content-block")
            posts.forEach(post => {
                fetch(`/user/${post.user_id}`).then(response => response.json()).then(user => {
                    const date = new Date(post.date);
                    const formattedDate = date.toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    });
                    contentBlock.innerHTML += ` <div class="post-block">
                                                    <h3>${post.title}</h3>
                                                    <p>${post.description}</p>
                                                    <p class="post-user-info">${user.username}</p>
                                                    <p class="post-user-info">${formattedDate}</p>
                                                </div>`
                    content.appendChild(contentBlock)
                })
                
            });
        })
        .catch(error => {console.error(error)})
}

async function editPost(postId) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    console.log('Edit post clicked', postId);
    if (newTitle !== null && newDescription !== null) {
        fetch(`/post/post/${postId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        })
        .then(updatedPost => {
            console.log('Post updated successfully:', updatedPost);
        })
    }
}

async function deletePost(postId) {
    try {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            const deleteResponse = await fetch(`/post/post/${postId}`, {
                method: 'DELETE',
            });
            if (deleteResponse.ok) {
            } else {
                console.error(`Error deleting user with ID ${postId}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


profileLink.addEventListener('click', profileLinkClick);
postLink.addEventListener('click', postLinkClick);
profileName.addEventListener('click', profileLinkClick);


