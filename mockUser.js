
export const mixinDuke = {
    isDuke: true,
    createdBy: {
        userName: '',
        when: Date.now(),
        title: ''
    },
    data: [
        {
            audio: {
                uri: '',
                fileName: '',
            },
            video: {
                uri: '',
                fileName: '',
            },
            gifs: [

            ]
        },
        {
            audio: {
                uri: '',
                fileName: '',
            },
            video: {
                uri: '',
                fileName: '',
            },
            gifs: [

            ]
        },
    ]
}

export const mixinSingle = {
    isDuke: false,
    createdBy: {
        userName: '',
        when: Date.now(),
        title: ''
    },
    data: [
        {
            audio: {
                uri: '',
                fileName: '',
            },
            video: {
                uri: '',
                fileName: '',
            },
            gifs: [

            ]
        },
    ]
}

export const user = {
    name: 'Ajay Jha',
    mobile: '9836648105',
    signupOtp: '3214',
    email: 'badcoder@meewee.net',
    password: 'abcdefgh',
    dob: '26/04/1993',
    gender: 'male',
    interest: 'female',
    hobbies: [
        'playing', 'cooking', 'listening songs'
    ],
    avatar: {
        uri: 'https://picsum.photos/200/300',
    },
    config: {
        general: {
            allowedWith: [
                {
                    id: '5f06c4c52c070b35b8150ad2',
                    name: 'Ajay Jha',
                    mobile: '9836648105',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: [
                        {
                            name: 'all',
                            type: 'security'
                        },
                    ]
                },
                {
                    id: '6845167057860820994',
                    name: 'Kashish Chopra',
                    mobile: '9470717982',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: []
                }
            ],
        },
        profile: {
            allowedWith: [
                {
                    id: '5f06c4c52c070b35b8150ad2',
                    name: 'Ajay Jha',
                    mobile: '9836648105',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: [
                        {
                            name: 'mobile',
                            type: 'security'
                        },
                        {
                            name: 'email',
                            type: 'security'
                        }
                    ]
                },
                {
                    id: '6845167057860820994',
                    name: 'Kashish Chopra',
                    mobile: '9470717982',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: []
                }
            ],
        },
        chat: {
            allowedWith: [
                {
                    id: '5f06c4c52c070b35b8150ad2',
                    name: 'Ajay Jha',
                    mobile: '9836648105',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: [
                        {
                            name: 'text',
                            type: 'communication'
                        },
                        {
                            name: 'audio',
                            type: 'communication'
                        },
                        {
                            name: 'video',
                            type: 'communication'
                        }
                    ]
                },
                {
                    id: '6845167057860820994',
                    name: 'Kashish Chopra',
                    mobile: '9470717982',
                    avatar: {
                        uri: 'https://picsum.photos/200/300'
                    },
                    allowedFields: []
                }
            ],
        }
    },
    buddies: [
        {
            id: '5f06c4c52c070b35b8150ad2',
            name: 'Ajay Jha',
            mobile: '9836648105',
            avatar: {
                uri: 'https://picsum.photos/200/300'
            }
        },
        {
            id: '6845167057860820994',
            name: 'Kashish Chopra',
            mobile: '9470717982',
            avatar: {
                uri: 'https://picsum.photos/200/300'
            }
        }
    ],
    followRequests: [
        {
            id: '5f06c4c52c070b35b8150ad2',
            name: 'Ajay Jha',
            mobile: '9836648105',
            avatar: {
                uri: 'https://picsum.photos/200/300'
            }
        },
        {
            id: '6845167057860820994',
            name: 'Kashish Chopra',
            mobile: '9470717982',
            avatar: {
                uri: 'https://picsum.photos/200/300'
            }
        }
    ]
}

const mixin = {
    poster: 'https://picsum.photos/200',
    user: {
      username: 'badcoder',
      description: 'This video is demo video from badcoder',
      music: 'test music',
      avatar: {
        uri: 'https://picsum.photos/200',
      },
    },
    count: {
      like: '1.1M',
      comment: '4080',
      share: '2800',
    },
    config: {
      medias: [
        {
          videoURI:
            'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
          audioURI:
            'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
            reactions : [
                {
                  name: 'heart',
                  coordinate: {
                    x: 10,
                    y: 30,
                  },
                },
                {
                  name: 'heart',
                  coordinate: {
                    x: 100,
                    y: 400,
                  },
                },
            ]
        },
        {
          videoURI:
            'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
          audioURI:
            'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
            reactions : [
                {
                  name: 'phone-call',
                  coordinate: {
                    x: 10,
                    y: 30,
                  },
                },
                {
                  name: 'phone-call',
                  coordinate: {
                    x: 100,
                    y: 400,
                  },
                },
            ]
        },
      ],
    },
}

export default mixin;
