
export const users = [
    {
        userID: 1,
        userName: 'johndoe',
        email: 'john.doe@example.com',
        fullName: 'John Doe',
        role: 'Admin',
        createdTime: new Date('2023-01-15T08:30:00'),
        updatedTime: new Date('2023-02-10T14:45:00'),
        coursesCount: 0,
        invoicesCount: 0
    },
    {
        userID: 2,
        userName: 'janesmith',
        email: 'jane.smith@example.com',
        fullName: 'Jane Smith',
        role: 'Instructor',
        createdTime: new Date('2023-01-20T10:15:00'),
        updatedTime: new Date('2023-03-05T09:30:00'),
        coursesCount: 3,
        invoicesCount: 0
    },
    {
        userID: 3,
        userName: 'robertjohnson',
        email: 'robert.johnson@example.com',
        fullName: 'Robert Johnson',
        role: 'Instructor',
        createdTime: new Date('2023-02-05T11:45:00'),
        coursesCount: 2,
        invoicesCount: 0
    },
    {
        userID: 4,
        userName: 'emilydavis',
        email: 'emily.davis@example.com',
        fullName: 'Emily Davis',
        role: 'Student',
        createdTime: new Date('2023-02-10T14:20:00'),
        updatedTime: new Date('2023-04-15T16:30:00'),
        coursesCount: 0,
        invoicesCount: 2
    },
    {
        userID: 5,
        userName: 'michaelbrown',
        email: 'michael.brown@example.com',
        fullName: 'Michael Brown',
        role: 'Student',
        createdTime: new Date('2023-02-15T09:10:00'),
        coursesCount: 0,
        invoicesCount: 3
    },
    {
        userID: 6,
        userName: 'sarahwilson',
        email: 'sarah.wilson@example.com',
        fullName: 'Sarah Wilson',
        role: 'Student',
        createdTime: new Date('2023-03-01T13:25:00'),
        coursesCount: 0,
        invoicesCount: 1
    },
    {
        userID: 7,
        userName: 'davidmiller',
        email: 'david.miller@example.com',
        fullName: 'David Miller',
        role: 'Instructor',
        createdTime: new Date('2023-03-10T15:40:00'),
        updatedTime: new Date('2023-04-20T11:15:00'),
        coursesCount: 1,
        invoicesCount: 0
    },
    {
        userID: 8,
        userName: 'lisaanderson',
        email: 'lisa.anderson@example.com',
        fullName: 'Lisa Anderson',
        role: 'Student',
        createdTime: new Date('2023-03-15T10:50:00'),
        coursesCount: 0,
        invoicesCount: 2
    }
];

export const userAuthProviders = [
    {
        authProviderID: 1,
        userID: 1,
        providerName: 'Google',
        providerUserID: 'google_123456',
        accessToken: 'google_access_token_example',
        refreshToken: 'google_refresh_token_example',
        expiryDate: new Date('2023-12-31T23:59:59'),
        createdTime: new Date('2023-01-15T08:30:00')
    },
    {
        authProviderID: 2,
        userID: 2,
        providerName: 'Facebook',
        providerUserID: 'facebook_123456',
        accessToken: 'facebook_access_token_example',
        refreshToken: 'facebook_refresh_token_example',
        expiryDate: new Date('2023-12-31T23:59:59'),
        createdTime: new Date('2023-01-20T10:15:00')
    },
    {
        authProviderID: 3,
        userID: 4,
        providerName: 'Google',
        providerUserID: 'google_789012',
        accessToken: 'google_access_token_example_2',
        refreshToken: 'google_refresh_token_example_2',
        expiryDate: new Date('2023-12-31T23:59:59'),
        createdTime: new Date('2023-02-10T14:20:00')
    }
]; 