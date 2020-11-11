stored_posts =
[
    {
        id: 1,
        text: "First post!"
    },
    {
        id: 2,
        text: "Second post!"
    }
];

stored_comments =
[
    {
        id: 1,
        text: " haha1",
        linked_post: 1
    },
    {
        id: 2,
        text: " haha2",
        linked_post: 1
    },
    {
        id: 3,
        text: " haha3",
        linked_post: 1
    },
    {
        id: 4,
        text: " baba1",
        linked_post: 2
    },
    {
        id: 5,
        text: " baba2",
        linked_post: 2
    },
    {
        id: 6,
        text: " baba3",
        linked_post: 2
    },
];

const draw_comment = function(ul, comment)
{
    let li = document.createElement('li');

    let btn_delete_comment = document.createElement('button');
    btn_delete_comment.className = "btn_delete_comment";
    btn_delete_comment.type="button";
    btn_delete_comment.innerText = "x";

    //onclick delete comment
    btn_delete_comment.onclick = function()
    {
        //delete comment
        for (let f in comment)
            delete comment[f];

        this.parentNode.parentNode.removeChild(this.parentNode);
    };

    li.appendChild(btn_delete_comment);

    let comment_text = document.createElement('span');
    comment_text.innerText = comment.text;
    li.appendChild(comment_text);
    ul.appendChild(li);
};

const draw_post = function(posts)
{
    for (let post of posts)
    {
        let div_post = document.createElement('div');
        div_post.className = "div_post";

        let txt_post = document.createElement('h3');
        txt_post.innerText = post.text;
        div_post.appendChild(txt_post);

        //create ul if we have comments on posts
        let div_comment = document.createElement('div');
        div_comment.className = "div_comment";
        div_post.appendChild(div_comment);

        let ul = document.createElement('ul');
        div_comment.appendChild(ul);

        for (let comment of stored_comments)
            if (comment.linked_post === post.id)
                draw_comment(ul, comment);

        let txt_comment = document.createElement('input');
        txt_comment.type = "text";
        txt_comment.placeholder = "Got something to say?";
        txt_comment.className = "txt_comment";
        div_comment.appendChild(txt_comment);

        let btn_comment = document.createElement('button');
        btn_comment.type = "button";
        btn_comment.innerText = "Comment";
        btn_comment.className = "btn_comment";
        btn_comment.onclick = function()
        {
            //on click to comment
            let txt_cmt = txt_comment.value;
            if (txt_cmt)
            {
                let new_comment_id = generate_new_id(stored_comments);
                let obj_comment = {id: new_comment_id, text: txt_cmt, linked_post: post.id};
                stored_comments.push(obj_comment);
                draw_comment(ul, obj_comment);
                txt_comment.value = "";
                txt_comment.focus();
            }
        };
        div_comment.appendChild(btn_comment);

        let btn_delete_post = document.createElement('button');
        btn_delete_post.className = "btn_delete_post";
        btn_delete_post.type="button";
        btn_delete_post.innerText = "Delete Post";

        //onclick delete post
        btn_delete_post.onclick = function()
        {
            //delete linked comments for current post
            for (let c of stored_comments)
            {
                if (post.id === c.linked_post)
                {
                    for (let cmt in c)
                        delete c[cmt];
                }
            }

            //delete post
            for (let f in post)
                delete post[f];

            this.parentNode.parentNode.removeChild(this.parentNode);
            console.log(stored_posts);
        };
        div_post.appendChild(btn_delete_post);

        container.prepend(div_post);
    }
};

const generate_new_id = function(obj)
{
    //generate new id for posts and comments
    let id_max = 0;
    obj.forEach(obj =>
    {
        if (obj.id > id_max)
            id_max = obj.id;
    });

    return id_max+1;
};

const btn_twit_click = function()
{
    let txt = txt_twit.value;
    if (txt)
    {
        let new_id = generate_new_id(stored_posts);
        let obj_post = [{id: new_id, text: txt}];
        stored_posts.push(obj_post);
        draw_post(obj_post);
        txt_twit.value = "";
    }
};


let container = document.getElementById("container");
let txt_twit = document.getElementById("txt_twit");
document.getElementById("btn_twit").onclick = btn_twit_click;
txt_twit.focus();

//call function to draw post
draw_post(stored_posts);