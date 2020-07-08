## user actions

### issue

```
(create)
- toggles private or public issue
- specifies capacity for conversation
- fills out description of issue
- submits and is routed to issue page

(update)
- toggles private or public issue
- specifies capacity for conversation
- fills out description of issue
- submits and is routed to issue page

(delete)
- deletes issue after filling out "delete me"
```

### comment

```
(create)
- fills out body of comment
- submits and page updates to display comment
- notifications sent to all users in chat

(update)
- fills out body of comment
- submits and page updates to display comment
- notifications sent to all users in chat

(delete)
- removes users comment by updating to "comment removed"
```

### dashboard

```
- see unread/read notifications
- see category scores
- create new issue
- join existing issue
- change account information
```

### homepage

```
- browse resolved public issues by category or random
- login and register
- visit the about page
```

### notifications

```
- notifications are links to unresolved issues
- unread show up first, read can be requested
```

### session

```
- the issue creator is the moderator
- the issue can have up to 10 category tags which will be the search terms for listeners
- the listeners try to resolve the issue creators "issue"
- the issue creator can ban listeners resulting in a negation from the category scores
- a positive category scores are rewarded to the listener who resolves the issue
- a resolved issue is then frozen from edits and can be made public as a "read only" document
```

## sql tables

```
(user)

create table if not exists user(
_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
username varchar(255) not null unique,
password varchar(255) not null,
primary key (_id)
);

(issue)

create table if not exists issue(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
url_title varchar(255) not null,
body text not null,
categories varchar(255) not null,
open_chat bit not null,
resolved bit not null,
public bit not null,
primary key (_id),
foreign key (owner_id)
references user (_id)
);

(silence)

create table if not exists silence(
_id binary(16) not null,
parent_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
user_id binary(16) not null,
primary key (_id),
foreign key (parent_id)
references issue (_id)
on delete cascade
);

(report)

create table if not exists report(
_id binary(16) not null,
parent_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
primary key (_id),
foreign key (parent_id)
references issue (_id)
on delete cascade
);

(comment)

create table if not exists comment(
_id binary(16) not null,
parent_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
body text not null,
primary key (_id),
foreign key (parent_id)
references issue (_id)
on delete cascade
);

(category)

create table if not exists category(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
category varchar(255) not null,
score int not null,
primary key (_id),
foreign key (owner_id)
references user (_id)
on delete cascade
);

(notify)

create table if not exists notify(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
link text not null,
body text not null,
dismissed bit not null,
primary key (_id),
foreign key (owner_id)
references user (_id)
on delete cascade
);
```

## queries

### issue

```
(create)

insert into issue
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?,
?,
?,
?,
?,
?,
?
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
body,
categories,
open_chat,
resolved,
public

(find issue)
select
from issue
where resolved = 0x00 and open_chat = 0x01 and categories like %?%;

(read resolved by date)

select
from issue
where resolved = 0x01 and public = 0x01
order by created_at desc limit ${index * offset}, ${offset};

(read resolved by category)

select
from issue
where resolved = 0x01 and public = 0x01 and categories like %?%
order by created_at desc limit ${index * offset}, ${offset};

(read unresolved owner)

select
from issue
where owner_id = uuid_to_bin(?) and resolved = 0x00
order by created_at desc limit ${index * offset}, ${offset};

(read resolved owner)

select
from issue
where owner_id = uuid_to_bin(?) and resolved = 0x01
order by created_at desc limit ${index * offset}, ${offset};

(read single url_title)

select
from issue
where url_title = ?;

(resolve url_title by _id)

select
from issue
where _id = uuid_to_bin(?);

(update issue)

update issue
updated_at = current_timestamp(),
body = ?,
categories = ?,
group_size = ?,
public = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(update resolved)

update issue
updated_at = current_timestamp(),
resolved = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(delete)

delete from issue where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

```

### silence

```
(create)

insert into silence
values(
uuid_to_bin(?),
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
uuid_to_bin(?)
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(parent_id) parent_id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
bin_to_uuid(user_id) user_id

(read)

select
from silence
where parent_id = uuid_to_bin(?) and user_id = uuid_to_bin(?);

```

### report

```
(create)

insert into report
values(
uuid_to_bin(?),
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp()
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(parent_id) parent_id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at

(read)

select
from report
where parent_id = uuid_to_bin(?);

```

### comment

```
(create)

insert into comment
values(
uuid_to_bin(?),
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(parent_id) parent_id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
body

(read)

select
from comment
where parent_id = uuid_to_bin(?)
order by created_at asc;

(update)

update comment
updated_at = current_timestamp(),
body = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(delete)

update comment
updated_at = current_timestamp(),
body = "comment removed"
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(distinct commentors)

select distinct owner_id
from comment
where parent_id = uuid_to_bin(?);

```

### category

```
(create)

insert into category
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
category,
score

(read by owner score)

select from category
where owner_id = uuid_to_bin(?)
order by score asc;

(read by owner category)
select from category
where owner_id = uuid_to_bin(?) and category = ?;

(update score up)

update category
updated_at = current_timestamp(),
score += 1
where owner_id = uuid_to_bin(?) and category = ?;

(update score down)

update category
updated_at = current_timestamp(),
score -= 1
where owner_id = uuid_to_bin(?) and category = ?;
```

### notify

```

(create)

insert into notify
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?
);

# select values

bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
link,
body,
dismissed

(read unread)

select from notify
where owner_id = uuid_to_bin(?) and dismissed = 0x00;
order by score asc;

(read read)

select from notify
where owner_id = uuid_to_bin(?) and dismissed = 0x01;
order by score asc;

(update dismissed)

update notify
updated_at = current_timestamp(),
dismissed = 0x01
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

```

## routes

```
# client

home: /
resolved date: /resolved/date
menu: /menu
account: /account
about: /about
tutorial: /tutorial
dashboard: /dashboard
create: /issue/create
read: /issue/read/:url_title
update: /issue/update/:url_title
delete: /issue/delete/:url_title

# user

create: POST /api/user/create
read: GET /api/user/read/username
readSingleId: GET /api/user/read/single/:_id
update username: PUT /api/user/update/username (secured)
update password: PUT /api/user/update/password (secured)
delete: DELETE /api/user/delete (secured)

# issue

create: POST /api/issue/create
find issue GET /api/issue/find
read resolved by date: GET /api/issue/read/resolved/date/:index/:offset
read resolved by categ: GET /api/issue/read/resolved/category/:category/:index/:offset
read unresolved owner: GET /api/issue/read/unresolved/owner/:index/:offset (secured)
read resolved owner: GET /api/issue/read/resolved/owner/:index/:offset (secured)
read single: GET /api/issue/read/single/:url_title
update: PUT /api/issue/update (secured)
update resolved: PUT /api/issue/update/resolved (secured)
delete: DELETE /api/issue/delete (secured)

# silence

silence: POST /api/silence/user (secured)

# report

report: POST /api/report/issue (secured)

# comment

create: POST /api/comment/create
read parent: GET /api/comment/read/:parent_id
update: PUT /api/comment/update (secured)
delete: DELETE /api/comment/delete (secured)

# category

read by owner: GET /api/category/read/owner (secured)

# notify

read new by owner: GET /api/notify/read/unread (secured)
read old by owner: GET /api/notify/read/read (secured)
update dismissed: PUT /api/notify/update/dismissed (secured)

```

## websockets

```
# read

message: /issue/read/message/:url_title
typing: /issue/read/typing/:url_title
disconnect: /issue/read/disconnect/:url_title

```
