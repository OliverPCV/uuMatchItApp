create table if not exists user
(
    id       int auto_increment
    primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    email    varchar(255) not null
    );

create table if not exists team
(
    id      int auto_increment
    primary key,
    name    varchar(255) not null,
    ownerId int          null,
    constraint FK_49a22109d0b97611c07768e37f1
    foreign key (ownerId) references user (id)
    );

create table if not exists invite
(
    id     int auto_increment
    primary key,
    userId int          not null,
    state  varchar(255) not null,
    teamId int          null,
    constraint FK_a1af15adb0da760faca840263c1
    foreign key (teamId) references team (id)
    on delete cascade
    );

create table if not exists team_players_user
(
    teamId int not null,
    userId int not null,
    primary key (teamId, userId),
    constraint FK_52d45fd74da54637d5190c8fda0
    foreign key (teamId) references team (id)
    on update cascade on delete cascade,
    constraint FK_e40e914d741ef98dca13adefbc1
    foreign key (userId) references user (id)
    on update cascade on delete cascade
    );

create index IDX_52d45fd74da54637d5190c8fda
    on team_players_user (teamId);

create index IDX_e40e914d741ef98dca13adefbc
    on team_players_user (userId);

create table if not exists tournament
(
    id         int auto_increment
    primary key,
    name       varchar(255) not null,
    type       varchar(255) not null,
    isFinished tinyint      not null,
    date       datetime     not null,
    place      varchar(255) not null,
    prize      varchar(255) not null,
    ownerId    int          null,
    constraint FK_9dbc398af9fdd807c8a7a105b15
    foreign key (ownerId) references user (id)
    );

create table if not exists tournament_teams_team
(
    tournamentId int not null,
    teamId       int not null,
    primary key (tournamentId, teamId),
    constraint FK_36eef76549cea08a85c1644dd6e
    foreign key (teamId) references team (id)
    on update cascade on delete cascade,
    constraint FK_48e20749264d1c0f2cb794decf3
    foreign key (tournamentId) references tournament (id)
    on update cascade on delete cascade
    );

create index IDX_36eef76549cea08a85c1644dd6
    on tournament_teams_team (teamId);

create index IDX_48e20749264d1c0f2cb794decf
    on tournament_teams_team (tournamentId);
