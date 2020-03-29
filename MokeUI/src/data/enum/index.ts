enum RequestStatus {
    Failed = 0,
    Success = 1,
}

enum ResponseStatusType {
    Failed = "500",
    Success = "200",
}

enum ArticleIsPublic {
    Yes = 1,
    No = 0,
}

enum FileMIMEType {
    All = 0,
    Image = 1,
    Audio = 2,
    Video = 3
}

enum ImageMIMEType {
    Png = 4,
    Jpg = 5,
    Gif = 6
}

enum AudioMIMEType {
    Mp3 = 7
}

enum VideoMIMEType {
    Mp4 = 8
}

enum SubsidiaryType {
    Drawing = 1,
    Declaim = 2,
    Music = 3,
    Appreciation = 4,
    Video = 5,
}

enum InvitationStatusType {
    Sustaining = 0,
    Accept = 1,
    Reject = 2,
    Finished = 3,
}

enum UserStatusType {
    Normal = 0,
    Baned = 1,
}

enum NotificationStatusType {
    NotRead = 0,
    Read = 1
}

enum SubsidiaryStatusType {
    Normal = 1,
    Baned = 0,
}

enum ArticleStatusType {
    Normal = 1,
    Baned = 0,
}

export {
    RequestStatus,
    ArticleIsPublic,
    SubsidiaryType,
    InvitationStatusType,
    UserStatusType,
    ResponseStatusType,
    FileMIMEType,
    ImageMIMEType,
    AudioMIMEType,
    VideoMIMEType,
    NotificationStatusType,
    SubsidiaryStatusType,
    ArticleStatusType
}