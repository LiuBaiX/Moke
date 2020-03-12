enum RequestStatus {
    Failed = 0,
    Success = 1,
}

enum ArticleIsPublic {
    Yes = 1,
    No = 0,
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
    Confined = 2,
    Monitored = 3,
}

export {
    RequestStatus,
    ArticleIsPublic,
    SubsidiaryType,
    InvitationStatusType,
    UserStatusType
}