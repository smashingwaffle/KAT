import React, { useState, useEffect, useMemo } from 'react';

// Embedded nets data
const NETS_DATA = {
  "source": "Ed's Radio (AA6ED) - edsradio.com",
  "region": "Greater Los Angeles Area",
  "nets": [
    {"name":"Citrus Belt Amateur Radio Club (W6JBT) Tech Net","time":"07:00","days":["monday","tuesday","wednesday","thursday","friday"],"repeater":"W6JBT","frequency":"146.850","offset":"-","pl":"146.2"},
    {"name":"Dr. Glenn L. Thorpe Memorial Oatmeal Net","time":"07:30","days":["monday","tuesday","wednesday","thursday","friday","saturday"],"repeater":"KE6HE","frequency":"146.805","offset":"-"},
    {"name":"Judy's (NB6J) Net","time":"07:45","days":["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"Calabasas Emergency Radio Program (CERP) Net","time":"08:00","days":["wednesday"],"repeater":"KG6ZRF","frequency":"445.520","offset":"-","pl":"94.8"},
    {"name":"San Gabriel Valley Net","time":"08:00","days":["monday","friday"],"repeater":"W6MPH","frequency":"145.180","offset":"-","pl":"156.7"},
    {"name":"ARRL Southwest Division Section Managers Net","time":"08:00","days":["sunday"],"system":"PAPA"},
    {"name":"Leisure World – Seal Beach Emergency Amateur Radio Club Net","time":"09:00","days":["monday","tuesday","wednesday","thursday","friday","saturday"],"frequency":"145.585","mode":"Simplex"},
    {"name":"Rio Hondo Amateur Radio Club Health, Welfare, and Trivia Net","time":"09:00","days":["monday","tuesday","wednesday","thursday","friday"],"repeater":"W6GNS","frequency":"146.175","offset":"+","pl":"156.7"},
    {"name":"Solera Radio Club (KC6SRC) Net","time":"09:00","days":["monday"],"repeater":"W6CDF","frequency":"147.915","offset":"-","pl":"123.0"},
    {"name":"Whittier Emergency Communications Net","time":"09:00","days":["tuesday"],"week":"3rd","repeater":"W6GNS","frequency":"146.175","offset":"+","pl":"156.7"},
    {"name":"Orange Radio Amateurs Club Net","time":"09:00","days":["wednesday"],"repeater":"W6KRW","frequency":"146.895","offset":"-","pl":"136.5"},
    {"name":"CARA Net at Nine Wellness","time":"09:00","days":["monday","tuesday","wednesday","thursday","friday"],"repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"Big Bear Amateur Radio Club Saturday Morning Net","time":"09:00","days":["saturday"],"repeater":"K6BB","frequency":"147.330","offset":"+","pl":"131.8"},
    {"name":"Lake Balboa Emergency Preparedness Net","time":"09:00","days":["sunday"],"frequency":"145.570","mode":"Simplex"},
    {"name":"Southern California Boater's Net","time":"09:00","days":["sunday"],"system":"PAPA"},
    {"name":"Palos Verdes Peninsula School District Net","time":"09:30","days":["tuesday"],"week":"1st","repeater":"W6SBA","frequency":"224.380","offset":"-","pl":"192.8"},
    {"name":"LA County Operations DCS Noon Net","time":"11:30","days":["tuesday"],"repeater":"WA6ZTR","frequency":"147.270","offset":"+","pl":"100.0"},
    {"name":"LAFD-ACS Situational Awareness Net","time":"12:00","days":["monday","tuesday","wednesday","thursday","friday"],"repeater":"WA6PPS","frequency":"147.300","offset":"+"},
    {"name":"JPL Emergency Amateur Radio Service Noon Net","time":"12:00","days":["monday"],"repeater":"WR6JPL","frequency":"224.080","offset":"-","pl":"156.7"},
    {"name":"Veteran Emergency Communication Support Group Net","time":"12:00","days":["monday"],"repeater":"N6GLA","frequency":"447.320","offset":"-","pl":"103.5"},
    {"name":"LAFD-ACS Daytime Net","time":"12:00","days":["thursday"],"repeater":"WA6PPS","frequency":"147.300","offset":"+"},
    {"name":"Western States Weak Signal Net","time":"16:30","days":["sunday"],"frequency":"144.200","mode":"SSB"},
    {"name":"Skywarn Youth Net","time":"17:30","days":["sunday"],"repeater":"KE6PGN","frequency":"447.820","offset":"-","pl":"67.0"},
    {"name":"Wrightwood Disaster Preparedness Net","time":"18:00","days":["sunday"],"frequency":"145.280","offset":"-","pl":"131.8"},
    {"name":"Seal Beach/Los Alamitos ARES Net","time":"18:00","days":["monday"],"system":"DARN"},
    {"name":"Foothill Flyers Radio Club Net","time":"18:15","days":["wednesday"],"frequency":"446.000","mode":"Simplex"},
    {"name":"GOTA Hams Simplex Net","time":"18:15","days":["wednesday"],"week":"4th","frequency":"146.580","mode":"Simplex"},
    {"name":"SPARC W6PRC Net (Simplex)","time":"18:30","days":["wednesday"],"week":"2nd, 4th, 5th","frequency":"145.540","mode":"Simplex"},
    {"name":"SPARC W6PRC Net (Repeater)","time":"18:30","days":["wednesday"],"week":"1st, 3rd","repeater":"W6CDF","frequency":"147.915","offset":"-","pl":"123.0"},
    {"name":"Fullerton Radio Club Net","time":"18:30","days":["wednesday"],"week":"except 2nd","repeater":"K6QEH","frequency":"146.970","offset":"-","pl":"136.5"},
    {"name":"San Bernardino Amateur SKYWARN Net","time":"18:30","days":["wednesday"],"repeater":"WB6TZU","frequency":"448.180","offset":"-"},
    {"name":"VA Long Beach ARC Net","time":"18:30","days":["wednesday"],"repeater":"W6NVY","frequency":"449.700","offset":"-","pl":"131.8"},
    {"name":"Cypress RACES Net","time":"18:30","days":["monday"],"frequency":"144.410","mode":"Simplex"},
    {"name":"Long Beach RACES / ARES South District Net","time":"18:30","days":["tuesday"],"repeater":"W6CHE","frequency":"146.145","offset":"+","pl":"156.7"},
    {"name":"Associated Radio Amateurs of Long Beach Net","time":"18:30","days":["friday"],"frequency":"449.780","offset":"-","pl":"131.8"},
    {"name":"WIN System Tech Net","time":"18:30","days":["friday"],"system":"WIN"},
    {"name":"Laguna Woods ARC Net (Simplex)","time":"18:30","days":["thursday"],"week":"1st","frequency":"146.580","mode":"Simplex"},
    {"name":"Laguna Woods ARC Net","time":"18:30","days":["thursday"],"week":"except 1st","repeater":"W6LY","frequency":"147.120","offset":"+","pl":"136.5"},
    {"name":"Buena Park RACES Net","time":"18:30","days":["thursday"],"repeater":"K6KBF","frequency":"445.520","offset":"-","pl":"85.4"},
    {"name":"Long Beach RACES 70cm Net","time":"18:30","days":["thursday"],"repeater":"K6CHE","frequency":"449.780","offset":"-","pl":"131.8"},
    {"name":"Wrightwood Disaster Preparedness Simplex Net","time":"18:40","days":["sunday"],"frequency":"145.525","mode":"Simplex"},
    {"name":"Garden Grove CERT ACS Net","time":"18:45","days":["monday"],"repeater":"KD6DDM","frequency":"146.610","offset":"-","pl":"103.5"},
    {"name":"Placentia RACES Net","time":"18:45","days":["tuesday"],"week":"2nd","frequency":"145.645","mode":"Simplex"},
    {"name":"Long Beach RACES 220 Net","time":"18:45","days":["thursday"],"repeater":"K6CHE","frequency":"223.800","offset":"-","pl":"156.7"},
    {"name":"Bozo Net","time":"19:00","days":["sunday","wednesday"],"frequency":"144.240","mode":"Simplex"},
    {"name":"Victor Valley ARC Net","time":"19:00","days":["sunday"],"frequency":"146.940","offset":"-","pl":"91.5"},
    {"name":"Conejo Valley ARC Newbie Net","time":"19:00","days":["sunday"],"repeater":"N6JMI","frequency":"147.885","offset":"-","pl":"127.3"},
    {"name":"Keller Peak Swap Net","time":"19:00","days":["wednesday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"OCHEART Net","time":"19:00","days":["wednesday"],"repeater":"W6KRW","frequency":"146.895","offset":"-","pl":"136.5"},
    {"name":"Moreno Valley ARES/RACES Net","time":"19:00","days":["wednesday"],"frequency":"147.510","mode":"Simplex"},
    {"name":"San Diego Six Shooters Shootout Net","time":"19:00","days":["wednesday"],"repeater":"WA6DVG","frequency":"224.940","offset":"-","pl":"94.8"},
    {"name":"SPARC 440 Informal Net","time":"19:00","days":["wednesday"],"frequency":"446.520","mode":"Simplex"},
    {"name":"ARES LA South District Net","time":"19:00","days":["wednesday"],"system":"DARN"},
    {"name":"PAPA System New Hams Net","time":"19:00","days":["wednesday"],"system":"PAPA"},
    {"name":"Western Riverside County Hospital Monthly Net","time":"19:00","days":["monday"],"week":"1st","repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"LA County Operations Area DCS Net","time":"19:00","days":["monday"],"repeater":"WA6ZTR","frequency":"147.270","offset":"+","pl":"100.0"},
    {"name":"Riverside County ARA Net","time":"19:00","days":["monday"],"week":"except 4th","repeater":"W6TJ","frequency":"146.880","offset":"-","pl":"146.2"},
    {"name":"Riverside County ARA Simplex Net","time":"19:00","days":["monday"],"week":"4th","frequency":"146.880","mode":"Simplex"},
    {"name":"Orange County RACES ACS Net","time":"19:00","days":["monday"],"repeater":"W6KRW","frequency":"146.895","offset":"-","pl":"136.5"},
    {"name":"CARA Membership Net","time":"19:00","days":["monday"],"repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"Rancho Cucamonga/Upland ACS Net","time":"19:00","days":["monday"],"repeater":"WB6QHB","frequency":"147.300","offset":"+","pl":"123.0"},
    {"name":"TARA Net","time":"19:00","days":["monday"],"repeater":"K6TPD","frequency":"223.860","offset":"-","pl":"100.0"},
    {"name":"Condor System Net","time":"19:00","days":["monday"],"repeater":"K6AEQ","frequency":"224.820","offset":"-","pl":"156.7"},
    {"name":"Glendora GEARS Net","time":"19:00","days":["tuesday"],"repeater":"W6GLN","frequency":"144.950"},
    {"name":"Pasadena Radio Club Net","time":"19:00","days":["tuesday"],"week":"except 4th","repeater":"W6MPH","frequency":"145.180","offset":"-","pl":"156.7"},
    {"name":"CLARA Info Net","time":"19:00","days":["tuesday"],"repeater":"K6ITR","frequency":"145.220","offset":"-","pl":"103.5"},
    {"name":"Valley Center ARC Net","time":"19:00","days":["tuesday"],"repeater":"N6VCC","frequency":"146.235","offset":"+","pl":"118.8"},
    {"name":"W6FNO Repeater Net","time":"19:00","days":["tuesday"],"repeater":"W6FNO","frequency":"146.820","offset":"-"},
    {"name":"Malibu CERT Net","time":"19:00","days":["tuesday"],"repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"Barstow ARC Net","time":"19:00","days":["tuesday"],"repeater":"WA6TST","frequency":"147.180","offset":"+","pl":"151.4"},
    {"name":"IRC WA6IRC Net","time":"19:00","days":["tuesday"],"repeater":"W6CPA","frequency":"223.900","offset":"-","pl":"136.5"},
    {"name":"Jerry Pettis VA Radio Club Net","time":"19:00","days":["tuesday"],"repeater":"AI6BX","frequency":"445.340","offset":"-","pl":"88.5"},
    {"name":"CARA 620 Net","time":"19:00","days":["tuesday"],"repeater":"AA6DP","frequency":"224.420","offset":"-","pl":"110.9"},
    {"name":"Downey ARC Net","time":"19:00","days":["tuesday"],"repeater":"W6TOI","frequency":"445.640","offset":"-","pl":"156.7"},
    {"name":"Mission Viejo Emergency Amateur Radio Net","time":"19:00","days":["tuesday"],"repeater":"KG6GI","frequency":"447.180","offset":"-"},
    {"name":"PAPA System Antenna Net","time":"19:00","days":["friday"],"system":"PAPA"},
    {"name":"CLARA STEM Net","time":"19:00","days":["thursday"],"repeater":"K6ITR","frequency":"145.220","offset":"-","pl":"103.5"},
    {"name":"Space Hams Net","time":"19:00","days":["thursday"],"repeater":"W6TRW","frequency":"145.320","offset":"-","pl":"114.8"},
    {"name":"CHART Net","time":"19:00","days":["thursday"],"frequency":"145.510","mode":"Simplex"},
    {"name":"CARA Trivia Net","time":"19:00","days":["thursday"],"week":"1st, 3rd","repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"Laguna Niguel ACS Net","time":"19:00","days":["thursday"],"repeater":"K6SOA","frequency":"147.645","offset":"-","pl":"110.9"},
    {"name":"LA American Red Cross Regional Net","time":"19:00","days":["thursday"],"system":"DARN"},
    {"name":"Northwest Riverside ARES Net","time":"19:00","days":["thursday"],"week":"except 1st","repeater":"KI6REC","frequency":"449.300","offset":"-","pl":"103.5"},
    {"name":"IDEC RACES Net","time":"19:00","days":["thursday"],"week":"except 4th","repeater":"N6IPD","frequency":"449.580","offset":"-"},
    {"name":"SPARC 220 Net","time":"19:15","days":["wednesday"],"frequency":"223.480","mode":"Simplex"},
    {"name":"Huntington Beach RACES Net","time":"19:15","days":["monday"],"repeater":"KH6FL","frequency":"145.140","offset":"-"},
    {"name":"MESAC Net","time":"19:15","days":["monday"],"repeater":"N6TVZ","frequency":"147.060","offset":"+"},
    {"name":"ARES LA South District Simplex Net","time":"19:15","days":["thursday"],"frequency":"145.510","mode":"Simplex"},
    {"name":"MARC Net","time":"19:15","days":["thursday"],"week":"1st","system":"PAPA"},
    {"name":"CLARA Trivia Net","time":"19:20","days":["wednesday"],"week":"1st, 3rd","repeater":"K6ITR","frequency":"145.220","offset":"-","pl":"103.5"},
    {"name":"North Star Net","time":"19:30","days":["sunday","tuesday"],"frequency":"144.405","mode":"Simplex"},
    {"name":"YARS Net","time":"19:30","days":["sunday"],"repeater":"AI6BX","frequency":"147.180","offset":"+","pl":"88.5"},
    {"name":"GOTA Hams Net","time":"19:30","days":["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],"exception":"except 2nd Thursday","repeater":"WG6OTA","frequency":"449.160","offset":"-","pl":"77.0"},
    {"name":"Topanga DRT Net","time":"19:30","days":["sunday"],"system":"PAPA"},
    {"name":"QCWA Chapter 7 Net","time":"19:30","days":["sunday"],"system":"DARN"},
    {"name":"South Pasadena ARC Net","time":"19:30","days":["wednesday"],"week":"except 1st, 2nd","repeater":"W6MPH","frequency":"145.180","offset":"-","pl":"156.7"},
    {"name":"South Pasadena ARC Simplex Net","time":"19:30","days":["wednesday"],"week":"2nd","frequency":"145.600","mode":"Simplex"},
    {"name":"Westminster RACES Net","time":"19:30","days":["wednesday"],"week":"1st, 3rd, 5th","frequency":"147.510","mode":"Simplex"},
    {"name":"Westminster RACES Tech Net","time":"19:30","days":["wednesday"],"week":"2nd, 4th","repeater":"WA6FV","frequency":"145.260","offset":"-","pl":"136.5"},
    {"name":"OC Region ERC Net","time":"19:30","days":["wednesday"],"week":"1st","frequency":"145.600","mode":"Simplex"},
    {"name":"Huntington Beach CERT Net","time":"19:30","days":["wednesday"],"repeater":"KH6FL","frequency":"145.140","offset":"-"},
    {"name":"SOARA D-STAR Net","time":"19:30","days":["wednesday"],"frequency":"146.115","mode":"D-STAR"},
    {"name":"Anaheim ARA Net","time":"19:30","days":["wednesday"],"repeater":"K6SYU","frequency":"146.790","offset":"-","pl":"103.5"},
    {"name":"Seal Beach/Los Alamitos RACES Net","time":"19:30","days":["wednesday"],"repeater":"KI6RBW","frequency":"449.300","offset":"-","pl":"141.3"},
    {"name":"HB RACES Net (with CERT)","time":"19:30","days":["monday"],"repeater":"W6BRP","frequency":"447.940","offset":"-"},
    {"name":"Fountain Valley RACES Net","time":"19:30","days":["monday"],"repeater":"WA6FV","frequency":"145.260","offset":"-","pl":"136.5"},
    {"name":"WALA Monday Newsline Net","time":"19:30","days":["monday"],"repeater":"N6RBR","frequency":"145.380","offset":"-","pl":"100.0"},
    {"name":"LA County DCS Net","time":"19:30","days":["monday"],"repeater":"W7BF","frequency":"146.640","offset":"-","pl":"167.9"},
    {"name":"Anaheim RACES Net","time":"19:30","days":["monday"],"repeater":"K6CF","frequency":"146.265","offset":"+","pl":"136.5"},
    {"name":"SB County OES Central Mountain Net","time":"19:30","days":["monday"],"week":"1st","repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"LAFD-ACS Net","time":"19:30","days":["monday"],"repeater":"WA6PPS","frequency":"147.300","offset":"+"},
    {"name":"Moreno Valley ARA Net","time":"19:30","days":["tuesday"],"repeater":"AB6MV","frequency":"146.655","offset":"-","pl":"103.5"},
    {"name":"West Coast Repeater Network","time":"19:30","days":["tuesday"],"repeater":"WA6TFD","frequency":"146.925","offset":"-","pl":"114.8"},
    {"name":"Rio Hondo ARC (W6KAT) Net","time":"19:30","days":["tuesday"],"repeater":"W6GNS","frequency":"223.940","offset":"-","pl":"100.0"},
    {"name":"Palos Verdes ARC Net","time":"19:30","days":["tuesday"],"repeater":"K6PV","frequency":"447.120","offset":"-"},
    {"name":"Keller Peak Trivia Net","time":"19:30","days":["friday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"Downey ARC Simplex Net","time":"19:30","days":["thursday"],"week":"except 1st","frequency":"145.595","mode":"Simplex"},
    {"name":"Inland Empire ARC Check-In Net","time":"19:30","days":["thursday"],"repeater":"W6IER","frequency":"145.460","offset":"-","pl":"77.0"},
    {"name":"Outdoor Adventure USA Net","time":"19:30","days":["thursday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"Golden Triangle ARC Net","time":"19:30","days":["thursday"],"repeater":"W6GTR","frequency":"146.805","offset":"-","pl":"100.0"},
    {"name":"South Bay ARC Net","time":"19:30","days":["thursday"],"week":"except 3rd","repeater":"W6SBA","frequency":"224.380","offset":"-","pl":"192.8"},
    {"name":"Westside ARC Trivia Net","time":"19:30","days":["thursday"],"repeater":"NO6BS","frequency":"449.700","offset":"-","pl":"131.8"},
    {"name":"DARN Chat Net","time":"19:45","days":["sunday"],"system":"DARN"},
    {"name":"Fullerton ERC Net","time":"19:45","days":["sunday"],"week":"1st","system":"SCIRA"},
    {"name":"YARS Simplex Net","time":"19:45","days":["sunday"],"week":"1st","frequency":"147.570","mode":"Simplex"},
    {"name":"Seal Beach/Los Alamitos RACES Net (2)","time":"19:45","days":["wednesday"],"repeater":"KE6HE","frequency":"146.805","offset":"-"},
    {"name":"Lucerne Valley ARC Net","time":"19:45","days":["monday"],"repeater":"KN6PXA","frequency":"145.180","offset":"-","pl":"123.0"},
    {"name":"Red Cross Desert to Sea Net","time":"19:45","days":["monday"],"repeater":"K6ITR","frequency":"145.220","offset":"-","pl":"103.5"},
    {"name":"CARA Swap Net","time":"19:45","days":["monday"],"repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"Mountain Area ARC Net","time":"19:45","days":["tuesday"],"repeater":"W6JBT","frequency":"146.850","offset":"-","pl":"146.2"},
    {"name":"Crescenta Valley RC Net","time":"20:00","days":["sunday"],"repeater":"WB6ZTY","frequency":"146.025","offset":"+","pl":"136.5"},
    {"name":"EMCOMM Hub on Keller Net","time":"20:00","days":["sunday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"SANDRA Net","time":"20:00","days":["sunday"],"repeater":"WB6WLV","frequency":"146.640","offset":"-","pl":"107.2"},
    {"name":"Corona CVS Net","time":"20:00","days":["sunday"],"repeater":"W6CPD","frequency":"147.225","offset":"+","pl":"156.7"},
    {"name":"Culver City ARES Net","time":"20:00","days":["sunday"],"repeater":"K6CCR","frequency":"445.600","offset":"-","pl":"131.8"},
    {"name":"Fullerton ERC Simplex Net","time":"20:00","days":["sunday"],"week":"1st","frequency":"144.435","mode":"Simplex"},
    {"name":"Battleship Iowa ARA Net","time":"20:00","days":["wednesday"],"repeater":"W6AM","frequency":"145.480","offset":"-","pl":"100.0"},
    {"name":"Rio Hondo ARC Net","time":"20:00","days":["wednesday"],"repeater":"W6GNS","frequency":"146.175","offset":"+","pl":"156.7"},
    {"name":"Riverside ECG Net","time":"20:00","days":["wednesday"],"repeater":"KD6DDM","frequency":"146.610","offset":"-","pl":"103.5"},
    {"name":"Antelope Valley ARC Net","time":"20:00","days":["wednesday"],"repeater":"KE6KIS","frequency":"146.730","offset":"-","pl":"100.0"},
    {"name":"SoCal Emergency Simplex Net","time":"20:00","days":["wednesday"],"frequency":"446.500","mode":"Simplex"},
    {"name":"Westside ARC Net","time":"20:00","days":["wednesday"],"repeater":"K6CCR","frequency":"445.600","offset":"-","pl":"131.8"},
    {"name":"PAPA All Mode Check-In Net","time":"20:00","days":["wednesday"],"week":"1st","system":"PAPA"},
    {"name":"Calnet Net","time":"20:00","days":["wednesday"],"system":"Calnet"},
    {"name":"ALERT Net","time":"20:00","days":["monday"],"repeater":"W6MPH","frequency":"145.180","offset":"+","pl":"156.7"},
    {"name":"SB County Fire ECS Management Net","time":"20:00","days":["monday"],"repeater":"K6JTH","frequency":"147.945","offset":"-","pl":"156.7"},
    {"name":"CREST Net","time":"20:00","days":["monday"],"frequency":"GMRS Ch 6","note":"Non-Amateur"},
    {"name":"SoCal DX Club Net","time":"20:00","days":["tuesday"],"repeater":"W6AM","frequency":"145.480","offset":"-","pl":"100.0"},
    {"name":"San Fernando Valley ARC Net","time":"20:00","days":["tuesday"],"frequency":"145.570","mode":"Simplex"},
    {"name":"ARES LA High Desert Net","time":"20:00","days":["tuesday"],"week":"except last","repeater":"KE6KIS","frequency":"146.730","offset":"-","pl":"100.0"},
    {"name":"MARA Los Padres Chapter Net","time":"20:00","days":["tuesday"],"repeater":"K6JHX","frequency":"147.225","offset":"+"},
    {"name":"United Radio Amateur Club Net","time":"20:00","days":["tuesday"],"repeater":"W6MEP","frequency":"147.240","offset":"+","pl":"67.0"},
    {"name":"SOARA Net","time":"20:00","days":["tuesday"],"repeater":"K6SOA","frequency":"147.645","offset":"-","pl":"110.9"},
    {"name":"Hispanic American ARC Net","time":"20:00","days":["tuesday"],"frequency":"147.945","offset":"-"},
    {"name":"LAECT Net","time":"20:00","days":["tuesday"],"frequency":"446.500","mode":"Simplex"},
    {"name":"ARES LA High Desert DARN Net","time":"20:00","days":["tuesday"],"week":"last","repeater":"K6VGP","frequency":"446.740","offset":"-"},
    {"name":"PAPA D-STAR Tech Net","time":"20:00","days":["tuesday"],"mode":"D-STAR"},
    {"name":"AmRRON Net","time":"20:00","days":["friday"],"repeater":"KD6DDM","frequency":"146.610","offset":"-","pl":"103.5"},
    {"name":"San Diego Six Shooters Net","time":"20:00","days":["friday"],"frequency":"224.940","offset":"-"},
    {"name":"Los Angeles ARC Net","time":"20:00","days":["saturday"],"frequency":"144.430","mode":"Simplex"},
    {"name":"Rio Hondo ARC Saturday Net","time":"20:00","days":["saturday"],"repeater":"W6GNS","frequency":"445.560","offset":"-","pl":"100.0"},
    {"name":"Saturday Night Round Table Net","time":"20:00","days":["saturday"],"system":"PAPA"},
    {"name":"SFVARC Thursday Net","time":"20:00","days":["thursday"],"repeater":"KB6C","frequency":"147.735","offset":"-","pl":"100.0"},
    {"name":"EARN W6SCE Net","time":"20:00","days":["thursday"],"repeater":"W6SCE","frequency":"224.760","offset":"-"},
    {"name":"PAPA Technical Round Table Net","time":"20:00","days":["thursday"],"system":"PAPA"},
    {"name":"ARES LA Northeast District Net","time":"20:00","days":["thursday"],"system":"DARN"},
    {"name":"D-STAR Round Table","time":"20:00","days":["thursday"],"mode":"D-STAR"},
    {"name":"MESAC Disaster Preparedness Net","time":"20:15","days":["monday"],"frequency":"144.330","mode":"Simplex"},
    {"name":"La Crescenta ERC Net","time":"20:30","days":["sunday"],"frequency":"144.480","mode":"Simplex"},
    {"name":"OC ARC 2 Meter Phone Net","time":"20:30","days":["monday","wednesday","friday"],"frequency":"146.550","mode":"Simplex"},
    {"name":"LA Section Traffic Net","time":"20:30","days":["tuesday","thursday"],"repeater":"K6JTH","frequency":"147.945","offset":"-","pl":"156.7"},
    {"name":"WIN System Swap Net","time":"20:30","days":["friday"],"week":"1st","system":"WIN"},
    {"name":"MARA LA ERC Net","time":"20:45","days":["sunday"],"week":"except 1st","repeater":"N6RBR","frequency":"145.380","offset":"-","pl":"100.0"},
    {"name":"MARA LA ERC Simplex Net","time":"20:45","days":["sunday"],"week":"1st","frequency":"146.550","mode":"Simplex"},
    {"name":"East Valley Simplex Net","time":"21:00","days":["sunday"],"week":"1st, 3rd","frequency":"146.450","mode":"Simplex"},
    {"name":"SoCal ERC Net","time":"21:00","days":["sunday"],"week":"1st","system":"SCIRA"},
    {"name":"Colton Area ERC Net","time":"21:00","days":["sunday"],"week":"except 1st","system":"SCIRA"},
    {"name":"Southern California Traffic Net","time":"21:00","days":["monday","wednesday","friday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"CARA Net at Nine Wellness (Evening)","time":"21:00","days":["monday","tuesday","wednesday","thursday","friday"],"repeater":"AA6DP","frequency":"147.090","offset":"+"},
    {"name":"ARES LA Northwest District Net","time":"21:00","days":["monday"],"system":"DARN"},
    {"name":"Red Eye Net (Anne N6BOP)","time":"22:00","days":["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],"repeater":"KE6TZG","frequency":"146.385","offset":"+","pl":"146.2"},
    {"name":"Insomniac Trivia Net","time":"22:00","days":["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],"system":"WIN"}
  ]
};

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Format frequency display
const formatFrequency = (net) => {
  if (net.system) return net.system + ' System';
  if (!net.frequency) return '';
  
  let display = net.frequency;
  if (net.offset) display += ` (${net.offset})`;
  if (net.pl) display += ` PL ${net.pl}`;
  if (net.mode === 'Simplex') display += ' Simplex';
  if (net.mode === 'D-STAR') display += ' D-STAR';
  if (net.mode === 'SSB') display += ' SSB';
  return display;
};

// Format time for display
const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get time in minutes from midnight
const getTimeInMinutes = (time24) => {
  const [hours, minutes] = time24.split(':').map(Number);
  return hours * 60 + minutes;
};

// Get current time in minutes
const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Check if net runs on specific week
const checkWeekConstraint = (net, date) => {
  if (!net.week) return true;
  
  const dayOfMonth = date.getDate();
  const weekOfMonth = Math.ceil(dayOfMonth / 7);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const isLastWeek = dayOfMonth > lastDayOfMonth - 7;
  
  const week = net.week.toLowerCase();
  
  if (week.includes('except')) {
    if (week.includes('1st') && weekOfMonth === 1) return false;
    if (week.includes('2nd') && weekOfMonth === 2) return false;
    if (week.includes('3rd') && weekOfMonth === 3) return false;
    if (week.includes('4th') && weekOfMonth === 4) return false;
    if (week.includes('5th') && weekOfMonth === 5) return false;
    if (week.includes('last') && isLastWeek) return false;
    return true;
  }
  
  if (week.includes('1st') && weekOfMonth === 1) return true;
  if (week.includes('2nd') && weekOfMonth === 2) return true;
  if (week.includes('3rd') && weekOfMonth === 3) return true;
  if (week.includes('4th') && weekOfMonth === 4) return true;
  if (week.includes('5th') && weekOfMonth === 5) return true;
  if (week.includes('last') && isLastWeek) return true;
  
  if (!week.match(/1st|2nd|3rd|4th|5th|last/)) return true;
  
  return false;
};

// Status badge component
const StatusBadge = ({ status }) => {
  const styles = {
    live: {
      background: 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
      color: '#000',
      animation: 'pulse 2s infinite',
    },
    soon: {
      background: 'linear-gradient(135deg, #ff9100 0%, #ffab40 100%)',
      color: '#000',
    },
    upcoming: {
      background: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.7)',
    }
  };

  const labels = {
    live: '● LIVE',
    soon: '◐ SOON',
    upcoming: '○ UPCOMING'
  };

  return (
    <span style={{
      ...styles[status],
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {labels[status]}
    </span>
  );
};

// Net card component
const NetCard = ({ net, status, compact = false }) => {
  const isLive = status === 'live';
  const isSoon = status === 'soon';
  
  return (
    <div style={{
      background: isLive 
        ? 'linear-gradient(135deg, rgba(0,200,83,0.15) 0%, rgba(0,230,118,0.05) 100%)'
        : isSoon
        ? 'linear-gradient(135deg, rgba(255,145,0,0.1) 0%, rgba(255,171,64,0.05) 100%)'
        : 'rgba(255,255,255,0.03)',
      border: isLive 
        ? '1px solid rgba(0,230,118,0.3)'
        : isSoon
        ? '1px solid rgba(255,171,64,0.2)'
        : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: compact ? '12px 16px' : '16px 20px',
      marginBottom: '8px',
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: compact ? '6px' : '10px',
      }}>
        <div style={{
          fontSize: compact ? '14px' : '15px',
          fontWeight: '600',
          color: '#fff',
          lineHeight: '1.3',
          flex: 1,
        }}>
          {net.name}
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.6)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>⏱</span>
          <span style={{ color: isLive ? '#00e676' : isSoon ? '#ffab40' : 'rgba(255,255,255,0.8)', fontWeight: '500' }}>
            {formatTime(net.time)}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>📻</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
            {formatFrequency(net)}
          </span>
        </div>
        
        {net.repeater && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>📡</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
              {net.repeater}
            </span>
          </div>
        )}
        
        {net.week && (
          <div style={{ 
            fontSize: '11px', 
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
          }}>
            ({net.week})
          </div>
        )}
      </div>
    </div>
  );
};

// Main component
export default function LANetsSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = DAY_NAMES[currentTime.getDay()];
  const currentMinutes = getCurrentTimeInMinutes();
  const displayDay = selectedDay || today;

  // Get nets for a specific day
  const getNetsForDay = useMemo(() => (day) => {
    return NETS_DATA.nets
      .filter(net => net.days.includes(day))
      .filter(net => checkWeekConstraint(net, currentTime))
      .sort((a, b) => getTimeInMinutes(a.time) - getTimeInMinutes(b.time));
  }, [currentTime]);

  // Get happening now / coming soon nets
  const { liveNets, soonNets, upcomingNets } = useMemo(() => {
    const todayNets = getNetsForDay(today);
    const live = [];
    const soon = [];
    const upcoming = [];

    todayNets.forEach(net => {
      const netMinutes = getTimeInMinutes(net.time);
      const diff = netMinutes - currentMinutes;

      // Assume nets last ~45 minutes
      if (diff <= 0 && diff > -45) {
        live.push(net);
      } else if (diff > 0 && diff <= 30) {
        soon.push(net);
      } else if (diff > 30 && diff <= 120) {
        upcoming.push(net);
      }
    });

    return { liveNets: live, soonNets: soon, upcomingNets: upcoming };
  }, [today, currentMinutes, getNetsForDay]);

  const displayNets = getNetsForDay(displayDay);
  const hasActiveNets = liveNets.length > 0 || soonNets.length > 0;

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
      minHeight: '100vh',
      color: '#fff',
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 8px 0',
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          📻 LA Area Ham Radio Nets
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          margin: 0,
        }}>
          Greater Los Angeles Area • Source: Ed's Radio (AA6ED)
        </p>
      </div>

      {/* Happening Now Section */}
      {hasActiveNets && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#00e676',
              animation: 'pulse 2s infinite',
            }} />
            Happening Now
          </h2>

          {liveNets.map((net, i) => (
            <NetCard key={`live-${i}`} net={net} status="live" compact />
          ))}
          
          {soonNets.map((net, i) => (
            <NetCard key={`soon-${i}`} net={net} status="soon" compact />
          ))}
        </div>
      )}

      {/* Coming Up Section */}
      {upcomingNets.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Coming Up (Next 2 Hours)
          </h2>

          {upcomingNets.slice(0, 5).map((net, i) => (
            <NetCard key={`upcoming-${i}`} net={net} status="upcoming" compact />
          ))}
        </div>
      )}

      {/* Day Selector */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '4px',
      }}>
        {DAY_NAMES.map((day, i) => {
          const isToday = day === today;
          const isSelected = day === displayDay;
          const netCount = getNetsForDay(day).length;
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(isToday ? null : day)}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: isSelected 
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '56px',
              }}
            >
              <span>{DAY_LABELS[i]}</span>
              <span style={{ 
                fontSize: '10px', 
                opacity: 0.7,
                fontWeight: '400',
              }}>
                {netCount}
              </span>
              {isToday && (
                <span style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: isSelected ? '#fff' : '#6366f1',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Full Day Schedule */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'capitalize',
          }}>
            {displayDay === today ? "Today's" : displayDay} Schedule
          </h2>
          <span style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
          }}>
            {displayNets.length} nets
          </span>
        </div>

        <div style={{
          maxHeight: '500px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}>
          {displayNets.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              No nets scheduled for this day
            </div>
          ) : (
            displayNets.map((net, i) => {
              const netMinutes = getTimeInMinutes(net.time);
              const diff = netMinutes - currentMinutes;
              let status = null;
              
              if (displayDay === today) {
                if (diff <= 0 && diff > -45) status = 'live';
                else if (diff > 0 && diff <= 30) status = 'soon';
              }
              
              return <NetCard key={i} net={net} status={status} />;
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '24px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)',
      }}>
        Data from edsradio.com • Updated automatically
      </div>
    </div>
  );
}
