import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { firebaseDB } from '../firebase';
import Alert from './Alert';

const Register = () => {
    const [marketers, setMarketers] = useState([
      {
          "ACCNO" : "3065004972",
          "BANK" : "FIRST",
          "DESCRIPTION" : "BDR",
          "DOB" : "220TH AUG.",
          "DURATION" : "2Months",
          "LOCATION" : "CHALLENGE",
          "NAME" : " ORIAKU MARGARET EBERECHI",
          "PHONENO" : "9093750786",
          "SCREEN" : "1",
          "STATUS" : "ACTIVE",
          "TEAM" : "BDR",
          "USERNAME" : "FSP0143"
        },
      {
      "ACCNO" : "0770001368",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "STAFF/CS",
      "DOB" : "25TH OCT.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " BAMIDELE TIMOTHY",
      "PHONENO" : "8032854838",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPRCS001"
    },
    {
      "ACCNO" : "0127295506",
      "BANK" : "GTB",
      "DESCRIPTION" : "ADM/CS",
      "DOB" : "10TH APRIL",
      "DURATION" : "4 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " AKANJI ADIJAT OLUWADARASIMI",
      "PHONENO" : "7066559881",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR0119"
    },
    {
      "ACCNO" : "0068391288",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ADM/CS",
      "DOB" : "5TH MAY",
      "DURATION" : "3 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OLASUPO LANRE MUHAMMED",
      "PHONENO" : "7062214958",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "B",
      "USERNAME" : "FSPR0116"
    },
    {
      "ACCNO" : "0079090664",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ADMIN/CS",
      "DOB" : "19TH JAN",
      "DURATION" : "PROBATION-2",
      "LOCATION" : "CHALLENGE",
      "NAME" : " AGORO DAMILOLA VICTORIA ",
      "PHONENO" : "8186845127",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR0180"
    },
    {
      "ACCNO" : "0119367327",
      "BANK" : "GTB",
      "DESCRIPTION" : "ADMIN/CS",
      "DOB" : "19TH SEPT",
      "DURATION" : "PROBATION-2",
      "LOCATION" : "CHALLENGE",
      "NAME" : " AJAO OREOLUWA OMOWUMI",
      "PHONENO" : "9014446722",
      "SCREEN" : "",
      "STATUS" : "AVTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR0178"
    },
    {
      "ACCNO" : "0070043380",
      "BANK" : "STERLING",
      "DESCRIPTION" : "MANAGER",
      "DOB" : "16TH AUGUST",
      "DURATION" : "3 MONTHS ",
      "LOCATION" : "IJEBU-ODE",
      "NAME" : " ADEMARATI ROTIMI OLUWOLE",
      "PHONENO" : "8032123427",
      "SCREEN" : "YES ",
      "STATUS" : "ACTIVE",
      "TEAM" : "C",
      "USERNAME" : "FSPR0122"
    },
    {
      "ACCNO" : "2024795847",
      "BANK" : "UBA",
      "DESCRIPTION" : "MANAGER",
      "DOB" : "24TH APRIL",
      "DURATION" : "",
      "LOCATION" : "IWO-ROAD",
      "NAME" : " ADEOJO ADEWALE IDOWU",
      "PHONENO" : "8161199968",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "C",
      "USERNAME" : "FSPR0070"
    },
    {
      "ACCNO" : "0036623830",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "MANAGER",
      "DOB" : "4TH MARCH",
      "DURATION" : "3 MONTHS ",
      "LOCATION" : "SAKI",
      "NAME" : " OMOGBEHIN  SUNDAY OLUWAGBIMA",
      "PHONENO" : "8064462015",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "C",
      "USERNAME" : "FSPR0120"
    },
    {
      "ACCNO" : "0049521264",
      "BANK" : "DIAMOND ACESS",
      "DESCRIPTION" : "MANAGER",
      "DOB" : "7TH APRIL",
      "DURATION" : "PROBATION-4",
      "LOCATION" : "ILORIN",
      "NAME" : " RICHARD ADENIKE SHARON",
      "PHONENO" : "8055203119",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "G",
      "USERNAME" : "FSPR0137"
    },
    {
      "ACCNO" : "0107927089",
      "BANK" : "GTB",
      "DESCRIPTION" : "CALLER",
      "DOB" : "18TH JAN.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " RODIAT AZEEZ YETUNDE",
      "PHONENO" : "8167483912",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR018"
    },
    {
      "ACCNO" : "156651300",
      "BANK" : "GTB",
      "DESCRIPTION" : "R&D",
      "DOB" : "",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ODERINU JEREMIAH ADEYEMI",
      "PHONENO" : "8164631081",
      "SCREEN" : "",
      "STATUS" : "REGULAR",
      "TEAM" : "F",
      "USERNAME" : "FSPR0190"
    },
    {
      "ACCNO" : "0000344015",
      "BANK" : "UNION",
      "DESCRIPTION" : "R&D/BDR",
      "DOB" : "29TH MARCH",
      "DURATION" : "2 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " AJAYI DOMINIC TAIWO",
      "PHONENO" : "8072319757",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "B",
      "USERNAME" : "FSPR0142"
    },
    {
      "ACCNO" : "0072460910",
      "BANK" : "DIAMOND ACESS",
      "DESCRIPTION" : "CALLER",
      "DOB" : "20TH SEPT.",
      "DURATION" : "4 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OMODARA OLUWATOMISIN ROSEMARY",
      "PHONENO" : "8030813196",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0147"
    },
    {
      "ACCNO" : "0825184907",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "BDR",
      "DOB" : "14TH JUNE",
      "DURATION" : "",
      "LOCATION" : "IWO",
      "NAME" : " IYIOLA ABIMBOLA OLAMIDE",
      "PHONENO" : "8115503595",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "G",
      "USERNAME" : "FSPR00149"
    },
    {
      "ACCNO" : "0164288947",
      "BANK" : "GTB",
      "DESCRIPTION" : "CALLER",
      "DOB" : "9TH MARCH",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " FIYINFOLUWA DEBORAH OGUNSOYE",
      "PHONENO" : "9026652272",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0135"
    },
    {
      "ACCNO" : "0034387742",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "CALLER",
      "DOB" : "10TH APRIL",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OGUNRINOLA ESTHER DAMILOLA",
      "PHONENO" : "8063251575",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0149"
    },
    {
      "ACCNO" : "2080006100",
      "BANK" : "ECO",
      "DESCRIPTION" : "CALLER",
      "DOB" : "7TH SEPT.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ABUKA NATHANIEL UDALE",
      "PHONENO" : "8159095500",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0124"
    },
    {
      "ACCNO" : "1410144861",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "CALLER",
      "DOB" : "11TH APRIL",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " VINCENT MARY IFEOMA",
      "PHONENO" : "902897926",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0136"
    },
    {
      "ACCNO" : "0123183016",
      "BANK" : "GTB",
      "DESCRIPTION" : "CALLER",
      "DOB" : "4TH OCT.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ADEYINKA SANYA ADEYEMI",
      "PHONENO" : "7032177388",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0132"
    },
     {
      "ACCNO" : "6173488158",
      "BANK" : "FIDELITY",
      "DESCRIPTION" : "CALLER",
      "DOB" : "24TH JUNE",
      "DURATION" : "PROBATION-1",
      "LOCATION" : "CHALLENGE",
      "NAME" : " LONGE OYINDAMOLA YUSIRAT",
      "PHONENO" : "8101251464",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0176"
    },
    {
      "ACCNO" : "0787683221",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "CALLER",
      "DOB" : "7TH JAN.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ABOLARIN RUTH ODUNAYO",
      "PHONENO" : "8167805584",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "E",
      "USERNAME" : "FSPR0115"
    },
    {
      "ACCNO" : "",
      "BANK" : "",
      "DESCRIPTION" : "BDR",
      "DOB" : "",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " GBEMIRO OLUBIYI",
      "PHONENO" : "8023375994",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "A",
      "USERNAME" : "FSPR005"
    },
    {
      "ACCNO" : "1231890228",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "BDR",
      "DOB" : "29TH JUNE",
      "DURATION" : "",
      "LOCATION" : "IWO ROAD",
      "NAME" : " OYEKOLA JOHN T.",
      "PHONENO" : "8135481875",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "G",
      "USERNAME" : "FSPR035"
    },
    {
      "ACCNO" : "0265790314",
      "BANK" : "GTB",
      "DESCRIPTION" : "BDR",
      "DOB" : "",
      "DURATION" : "4 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " EKEANYANWU CHINMA UGOEZE",
      "PHONENO" : "",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR0145"
    },
    {
      "ACCNO" : "3067025104",
      "BANK" : "FIRST",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "25TH SEPT.",
      "DURATION" : "3 MONTHS",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OLAPADE OLALEYE OLATUNDE",
      "PHONENO" : "8076218949",
      "SCREEN" : "∫",
      "STATUS" : "ACTIVE",
      "TEAM" : "A",
      "USERNAME" : "FSPR0126"
    },
    {
      "ACCNO" : "0013415528",
      "BANK" : "STANBIC",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "8TH JAN.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OLUKOYA EMMANUEL OLUWASEGUN",
      "PHONENO" : "8166724166",
      "SCREEN" : " ",
      "STATUS" : "ACTIVE",
      "TEAM" : "A",
      "USERNAME" : "FSPR0148"
    },
     {
      "ACCNO" : "1228632240",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "18TH JUNE",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ELSIE SANNI",
      "PHONENO" : "7013558844",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "C",
      "USERNAME" : "FSPR002"
    },
    {
      "ACCNO" : "0045001835",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "15TH NOV",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ABIOLA OMOLEYE",
      "PHONENO" : "8157876678",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "B",
      "USERNAME" : "FSPR007"
    },
     {
      "ACCNO" : "0765970839",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "26TH SEPT.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " MARIAM ADEAGBO TEMITAYO",
      "PHONENO" : "7063970704",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR031"
    },
    {
      "ACCNO" : "3108596048",
      "BANK" : "FIRST",
      "DESCRIPTION" : "ALPHA",
      "DOB" : "22ND FEB.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OKELEJI JOY TEMITOPE",
      "PHONENO" : "7061632847",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR00051"
    },
    {
      "ACCNO" : "1408599477",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "CONTRACT/IT",
      "DOB" : "24TH APRIL",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " ASHRAF SALMAN",
      "PHONENO" : "8169094945",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPRIT#100"
    },
    {
      "ACCNO" : "0785361392",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "ICT",
      "DOB" : "20TH AUG.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " UTHMAN YAHYA",
      "PHONENO" : "8059530392",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR029"
    },
    {
      "ACCNO" : "0781286417",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "MD",
      "DOB" : "12TH DEC.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " SHITTU MUHAMMED TIJANI",
      "PHONENO" : "8076319032",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPMD"
    },
    {
      "ACCNO" : "2254584192",
      "BANK" : "ZENITH",
      "DESCRIPTION" : "HOM",
      "DOB" : "22ND NOV",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " SEWEJE NIKE",
      "PHONENO" : "8039545826",
      "SCREEN" : "",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR004"
    },
    {
      "ACCNO" : "",
      "BANK" : "",
      "DESCRIPTION" : "R&D DIRECTOR",
      "DOB" : "25TH FEB.",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " OLAGOROYE TOSIN GODWIN",
      "PHONENO" : "8130232512",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR06"
    },
    {
      "ACCNO" : "",
      "BANK" : "",
      "DESCRIPTION" : "HOE",
      "DOB" : "",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " HABEEB BALOGUN IFEOLUWA",
      "PHONENO" : "7054446726",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPR01"
    },
    {
      "ACCNO" : "0763221386",
      "BANK" : "ACCESS",
      "DESCRIPTION" : "HR",
      "DOB" : "31ST MAY",
      "DURATION" : "",
      "LOCATION" : "CHALLENGE",
      "NAME" : " VICTORIA ENEDABOJO UMARU",
      "PHONENO" : "8062266958",
      "SCREEN" : "1",
      "STATUS" : "ACTIVE",
      "TEAM" : "F",
      "USERNAME" : "FSPHR"
    },
  ])
    const banks =[
        { "id": "1", "name": "Access Bank" ,"code":"044" },
        { "id": "2", "name": "Citibank","code":"023" },
        { "id": "3", "name": "Diamond Bank","code":"063" },
        { "id": "4", "name": "Dynamic Standard Bank","code":"" },
        { "id": "5", "name": "Ecobank Nigeria","code":"050" },
        { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
        { "id": "7", "name": "First Bank of Nigeria","code":"011" },
        { "id": "8", "name": "First City Monument Bank","code":"214" },
        { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
        { "id": "10", "name": "Heritage Bank Plc","code":"030" },
        { "id": "11", "name": "Jaiz Bank","code":"301" },
        { "id": "12", "name": "Keystone Bank Limited","code":"082" },
        { "id": "13", "name": "Providus Bank Plc","code":"101" },
        { "id": "14", "name": "Polaris Bank","code":"076" },
        { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
        { "id": "16", "name": "Standard Chartered Bank","code":"068" },
        { "id": "17", "name": "Sterling Bank","code":"232" },
        { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
        { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
        { "id": "20", "name": "United Bank for Africa","code":"033" },
        { "id": "21", "name": "Unity Bank Plc","code":"215" },
        { "id": "22", "name": "Wema Bank","code":"035" },
        { "id": "23", "name": "Zenith Bank","code":"057" }
    ]

    // declearing hooks
    const [officer, setOfficer] = useState(" ")
    const [bankCode, setBankCode] = useState("044")
    const [username, setUsername] = useState("FSPY")
    const [accType, setAccType] = useState("bT1")
    const [regCounter, setRegCounter] = useState(0)
    const [duedates, setDuedates] = useState([])
    const [bankName, setBankName] = useState("Enter bank details to reveal name...")
    const [filteredMarketers, setfilteredMarketers] = useState(marketers)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })
    useEffect(()=> {
      getRegDate()
    }, [])

    useEffect(()=> {
      if(alert.status===true){
        setTimeout(() => {
          setAlert({status: false})
        }, 10000);
      }
    })


    // declearing functions
    const close =()=>{
        document.querySelector('.register').classList.toggle('close')
        document.querySelector('.toggle').classList.toggle('icon')
    }

    // filter account officers
    const filtered = marketers
    const filterOfficers = (value) => {
      setOfficer(value)
      const filteredMarketers = filtered.filter(e=>e.NAME.toLowerCase().includes(value.toLowerCase()))
      setfilteredMarketers(filteredMarketers)
    }

    // get bank name
    const getName = (e) => {
        if(e.length>9){
            setBankName('Fetching bank name...')
            fetch(`https://api.paystack.co/bank/resolve?account_number=${e.trim()}&bank_code=${bankCode}`, {
                method: 'get',
                headers: {
                'Authorization': `Bearer sk_test_2684062172e67c4246c232f191b67190a5fb458b`
                },}
                ).then(e=>{
                    return e.json()
                    .then(e=>{
                        console.log(e)
                        if(e.data.account_name){
                            setBankName(e.data.account_name)
                        }else {
                            setBankName('Couldn\'t fetch bank name!')
                        }

                    })
                }).catch(e=>{
                    console.log(e)
                    setBankName('Couldn\'t fetch bank name!')
            })
        }
    }

    const register = (e) => {
      setLoading(true)
      e.preventDefault()
      getDuedates(regCounter.date)
      const userDetails = {
        ["Registration Date"]: regCounter.date,
        Name: bankName,
        email: e.target.email.value,
        address: e.target.address.value,
        // birth: e.target.birth.value,
        invplan: e.target.invplan.value,
        phone: e.target.phone.value,
        nok: e.target.nok.value,
        nok_phone: e.target.nokphone.value,
        bankCode,
        acc_no: e.target.acc_no.value,
        accountOfficer: e.target.aOfficer.value,
        // userid: e.target.userid.value,
        account_type: e.target.account_type.value,
        // planType: e.target.planType.value,
        Stage: 0,
        lastActivityTitle: 'registration',
        balance: 0,
        spent: 0,
        fsp21: true
      }
      firebaseDB.ref("lastUsername").once('value').then(snapshot=> {
        const username = `FSPY0${parseInt(snapshot.val().yakata)+1}`
        console.log(username)
        // setUsername(username)
        if(bankName === 'Couldn\'t fetch bank name!'){
          setLoading(false)
          setAlert({
            status: true,
            message: 'Investor cannot be registered without a valid bank account'
          })
        }else if(bankName === 'Fetching bank name...') {
          setLoading(false)
          setAlert({
            status: true,
            message: 'Verifying account details'
          })
        }else {
          firebaseDB.ref('investors').push().set({...userDetails, ["User name"]: username}).then(()=> {
            firebaseDB.ref("lastUsername").update({yakata: parseInt(snapshot.val().yakata)+1}).then(()=> {
              setAlert({
                status: true,
                type: 'positive',
                message: 'Account registered successfully'
              })
              setLoading(false)
              document.querySelector('.regform').reset()
              setBankName("")
              setOfficer("")

              // send duedate as sms
              setTimeout(() => {
                sendDuedates(userDetails.phone, username)
              }, 1000);
            })
            firebaseDB.ref('regCounter').update({
              accounts: regCounter.accounts+1
            })
          })
        }

      })
      
    }

    const getRegDate = () => {
      firebaseDB.ref('regCounter').on('value', snapshot => {
        const regCounter = snapshot.val()
        if(regCounter.accounts<=30){
          setRegCounter(regCounter)
          getDuedates(regCounter.date)
        }else {
          const newDate = moment(regCounter.date, "DD-MM-YYYY").businessAdd(1, 'day').format("DD-MM-YYYY")
          firebaseDB.ref('regCounter').update({
            accounts: 0,
            date: newDate
          }).then(()=>{
            // getRegDate()
          })
          
        }
      })
    }

    const getDuedates = (regDate, type) => {
      const dueDates = []
      setAccType(type)
      if(type==='bT2'){
        for(let i = 2; i<=6; i+=2){
          const date = moment(regDate, "DD-MM-YYYY").businessAdd((i), 'month').format("DD-MM-YYYY")
          dueDates.push(date)
        }
      }else if(type==='bT1') {
        for(let i = 1; i<=8; i++){
          const date = moment(regDate, "DD-MM-YYYY").businessAdd((i), 'month').format("DD-MM-YYYY")
          dueDates.push(date)
        }
      }else if(type==='st') {
          const date = moment(regDate, "DD-MM-YYYY").businessAdd((6), 'month').format("DD-MM-YYYY")
          dueDates.push(date)
        
      }else {
        const date = moment(regDate, "DD-MM-YYYY").businessAdd((1), 'year').format("DD-MM-YYYY")
        dueDates.push(date)
      
    }
      setDuedates(dueDates)
    }

    const sendDuedates = ( phone, username ) => {
      const dates = duedates.join(", ")
      fetch(`https://portal.nigeriabulksms.com/api/?username=freedomsynergypro@gmail.com&password=fsp003&message=Hello ${bankName}, your user name is ${username}, and
        your due dates are: ${dates}. Follow this link to access your dashboard https://freedomsynergypro.com/ &sender=FSP&mobiles=${phone}&type=message`).then(e=>{
        console.log(e.json())
      })
    }

    return (
        <div className="register">
            {
              alert.status?
              <Alert type={alert.type} message={alert.message}/>:null
            }
            <header className="regheader">Add a new investor</header>
            <div className="container">
            <form className="regform" onSubmit={(e)=>register(e)}>
                <select name="bankCode" onChange={(e)=> setBankCode(e.target.value)}>
                    {
                        banks.map(e=><option value={e.code}>{e.id} - {e.name}</option>
                        )
                    }
                </select>
                <input onChange={(e)=> getName(e.target.value)} name="acc_no" placeholder="Account number"/>
                <p>{bankName}</p>
                <input name="email" placeholder="Email Address" />
                <input name="address" placeholder="Address" />
                <input name="phone" placeholder="Phone number" />
                <input name="nok" placeholder="Next of kin" />
                <input name="nokphone" placeholder="Next of kin's Phone number" />

                <div className="">
                    <div className="fieldset">
                            <input id="bT1" type="radio" value="bT1" onChange={()=>getDuedates(regCounter.date, "bT1")} name="account_type" />
                            <label for="bT1">BT1</label>

                            <input id="bT2" type="radio" value="bT2" onChange={()=>getDuedates(regCounter.date, "bT2")} name="account_type" />
                            <label for="bT2">BT2</label>

                            <input id="st" type="radio" value="st" onChange={()=>getDuedates(regCounter.date, "st")} name="account_type" />
                            <label for="st">Standard</label>
                      
                            <input id="dnt" type="radio" value="dnt" onChange={()=>getDuedates(regCounter.date, "dnt")} name="account_type" />
                            <label for="dnt">DNT</label>

                            <input id="pt1" type="radio" value="pt1" onChange={()=>getDuedates(regCounter.date, "pt1")} name="account_type" />
                            <label for="pt1">PT1</label>

                            <input id="pt2" type="radio" value="pt2" onChange={()=>getDuedates(regCounter.date, "pt2")} name="account_type" />
                            <label for="pt2">PT2</label>
                    </div>
                </div>

                {
                  accType && accType.includes("bT")?
                  <select name="invplan">
                    <option value="p_50k">NGN50,000</option>
                    <option value="p_100k">NGN100,000</option>
                    <option value="p_150k">NGN150,000</option>
                    <option value="p_200k">NGN200,000</option>
                    <option value="p_250k">NGN250,000</option>
                  </select>:
                  accType==='st'?
                  <select name="invplan">
                    <option value="p_100k">NGN100,000</option>
                    <option value="p_150k">NGN150,000</option>
                    <option value="p_200k">NGN200,000</option>
                    <option value="p_250k">NGN250,000</option>
                  </select>:
                  accType==='dnt'?
                  <select name="invplan">
                    <option value="p_250k">NGN250,000</option>
                    <option value="p_300k">NGN300,000</option>
                    <option value="p_350k">NGN350,000</option>
                    <option value="p_400k">NGN400,000</option>
                    <option value="p_500k">NGN500,000</option>
                  </select>:
                  accType==='pt1'?
                  <input placeholder="Enter amount" defaultValue="1000000" min="1000000" max="5000000" type="number" step="100000" />:
                  <input placeholder="Enter amount" defaultValue="6000000" min="6000000" type="number" step="500000" />
                }

                <div className="officer">
                    <input value={officer} onChange={(e)=> filterOfficers(e.target.value)} type="officer"  name="aOfficer" placeholder="Account officer"/>
                    <ul>
                        {
                            filteredMarketers.map(e=><li onClick={()=> setOfficer(`${e.USERNAME} - ${e.NAME}`)}>{e.NAME}</li>
                            )
                        }
                    </ul>
                </div>
                <div className="cta">
                    {
                      loading?
                      <button className="btn"><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                      <button className="btn">Add investor</button>
                    }
                </div>
            </form>
                <button className="toggle" onClick={close}>{">"}<FontAwesome name="angle"/></button>
            </div>

        </div>
    );
};

export default Register;