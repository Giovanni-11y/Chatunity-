

function handler(message) {
    // Create a mock message object with owner contact information
    let contactMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: 'Owner ChatUnity',
                vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    // Filter and get active chat sessions from global.db
    const activeSessions = global.db.filter(([sessionId, sessionData]) => sessionId && sessionData);
    
   
    this.sendContact(
        message.chat,
        activeSessions.map(([sessionId, sessionData]) => [sessionId, sessionData]),
        contactMessage
    );
}


handler.help = ['owner'];           
handler.tags = ['main'];           
handler.command = [               
    'owner',
    'creator', 
    'admin',
    'fgowner'
];


export default handler;