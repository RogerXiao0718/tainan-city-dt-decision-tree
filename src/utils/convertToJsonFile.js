let fs = require('fs')

const proposalList = [
    {
        name: '博物展館三維建模結合室內展覽VR體驗',
        departments: ['文化局'],
        domain: ['文化', '觀光', '旅遊'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: true,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        }

    },
    {
        name: '數位雙生輔助線上觀光並輔助古蹟修繕',
        departments: ['文化局'],
        domain: ['文化', '觀光', '旅遊'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: false,
            note: ''
        }

    },
    {
        name: '商圈及老街建模結合VR環遊服務',
        departments: ['觀光旅遊局'],
        domain: ['文化', '觀光', '旅遊', '電商'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: true,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: false,
            note: ''
        }

    },
    {
        name: '數位雙生輔助購物中心運營',
        departments: ['經濟發展局'],
        domain: ['娛樂', '電商', '觀光'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: true,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: false,
            note: ''
        },
        crossCityCollab: {
            value: true,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        }
    },
    {
        name: '數位雙生輔助太陽能智慧化管理',
        departments: ['經濟發展局'],
        domain: ['公共服務'],
        doable: {
            value: false,
            note: ''
        },
        profitable: {
            value: true,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: true,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        }
    },
    {
        name: '數位雙生輔助沙崙科學城園區管理',
        departments: ['經濟發展局'],
        domain: ['公共服務'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        }
    },
    {
        name: '數位雙生輔助公有零售市場管理',
        departments: ['經濟發展局'],
        domain: ['公共服務'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: false,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    },
    {
        name: '使用VR技術結合運動訓練',
        departments: ['體育局'],
        domain: ['運動科技'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: true,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: false,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    },
    {
        name: '數位雙生輔助城市治理',
        departments: ['都市發展局', "交通局", "民政局", "消防局", "水利局"],
        domain: ['公共服務'],
        doable: {
            value: false,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: false,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: true,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    },
    {
        name: '數位雙生輔助交通治理',
        departments: ['交通局'],
        domain: ['公共服務'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: true,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    },
    {
        name: '數位雙生應用於災害應變',
        departments: ['消防局'],
        domain: ['公共服務'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    },
    {
        name: '數位雙生應用於災害應變',
        departments: ['消防局'],
        domain: ['公共服務'],
        doable: {
            value: true,
            note: ''
        },
        profitable: {
            value: false,
            note: ''
        },
        publicService: {
            value: true,
            note: ''
        },
        sustainable: {
            value: true,
            note: ''
        },
        deptCollab: {
            value: true,
            note: ''
        },
        crossCityCollab: {
            value: false,
            note: ''
        },
        internationalPromote: {
            value: true,
            note: ''
        },
    }    
]

const convertToJson = () => {
    const proposal_json = JSON.stringify(proposalList)
    console.log(proposal_json)
    fs.writeFile('../data/proposalList.json', proposal_json, 'utf8', (err, _) => {
        if (err) {
            console.log(err)
        }
    });
}

convertToJson()
