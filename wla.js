import { writeFileSync } from 'fs';

const sanitizeKey = (key) => {
    return key.replace(/[$#\[\]./]/g, '_').trim();
};

const csvToJson = (csv) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(';').map(header => sanitizeKey(header.trim()));
    
    const result = lines.slice(1).map(line => {
        const values = line.split(';').map(value => value.trim());
        let obj = {};
        
        headers.forEach((header, index) => {
            if (header) {  // Ignore empty headers
                obj[header] = values[index] || null;
            }
        });
        
        return obj;
    });
    
    return result;
};

const saveJsonToFile = (data, filename = 'data.json') => {
    const jsonString = JSON.stringify(data, null, 2);
    writeFileSync(filename, jsonString, 'utf-8');
    console.log(`File ${filename} has been saved.`);
};

const csvData = `IDPlace;NomPlace;MSQ;SYSINT;NEURO-GER;AIGU;REHAB;AMBU;FR;DE;IT;ENG;PFP2;PFP1A;PFP1B;PFP4;PFP3;Remarques
-O3k_m7cRctNx0MEzaU-;Ambu;true;;true;;true;true;true;;;;1;1;1;1;1
-Neh_Ttzz1yliQ8-FCwd;Ortho;true;;true;;true;;;true;;;;;
-O3kbfe81TTvVKEinjxO;Ortho - Med;true;true;;;true;;true;true;;;1;1;0;0;1;
-O3kbfe81TTvVKEinjxO;Neuro;;;true;;true;;true;true;;;1;1;0;0;1;
-Neh_TtqlkfsEXOpJuZ6;Ambu;true;;true;;true;true;true;;;;1;0;0;0;1;
-Neh_Ttrz8anl_WDKqed;Ambu;true;;true;;true;true;true;;;;0;1;1;0;0;
-Neh_Ttrz8anl_WDKqee;Ambu;true;;true;;true;true;true;;;;1;0;1;0;1;
-Neh_Ttrz8anl_WDKqef;Ambu;true;;true;;true;true;true;;;;;;;;;
-Neh_Ttrz8anl_WDKqeg;Ambu;;true;;true;true;;;;true;;0;0;0;0;1;
-Neh_Tts5U9CHo9_p95u;Ambu;true;;true;;true;true;true;;;;1;0;0;1;0;
-Neh_Tts5U9CHo9_p95v;Ortho - Med;true;true;;true;;;true;true;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Tts5U9CHo9_p95x;Rehab - Sport;true;;;;true;;true;;;;0;0;0;3;2;
-Neh_Tts5U9CHo9_p95y;Ambu;true;;true;;true;true;;true;;;0;0;0;1;0;
-Neh_TttD0thS5tY-yyR;Ortho;true;;;;true;;true;;;;3;3;3;3;3;
-Neh_TttD0thS5tY-yyR;Para - Tetra;;;true;;true;;true;;;;1;1;1;1;1;
-Neh_Ttu3CYo8WbkqIJn;Ambu;true;;;true;;true;true;;;;1;0;0;1;1;
-Neh_Ttu3CYo8WbkqIJo;Ambu;true;;true;;true;true;;true;;;1;1;0;1;1;
-Neh_Ttu3CYo8WbkqIJp;Ortho - Psychosomatique;true;;;;true;;true;;;;1;0;1;1;1;
-Neh_Ttu3CYo8WbkqIJq;Med;;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttu3CYo8WbkqIJq;Ortho;true;;;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccH;Neuro;;;true;;true;;true;true;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccH;Ortho;true;;;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccI;Ger;;;true;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccJ;Ger;;;true;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccK;Ortho - Med;true;true;;true;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccL;Ortho - Med - Ger;true;true;true;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtvxPdffqwTHccM;Ortho - Med - Ger;true;true;true;true;;true;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtwPcuW60cfmbyV;Ortho - Med;true;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtwPcuW60cfmbyW;Ortho - Ger;true;;true;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtwPcuW60cfmbyX;Ambu;true;;true;;true;true;true;;;;0;0;0;0;0;
-Neh_TtwPcuW60cfmbyY;Ambu;true;;true;;true;true;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtwPcuW60cfmbyZ;Ortho;true;;;true;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_TtwPcuW60cfmbyZ;Med;;true;;true;true;;true;;;;1;1;1;1;1;
-Neh_Tu-HYARvsZv31DS;Ger;;true;;true;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Tu0ifoZo_RPDyHx;Ger;;;true;true;true;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmby_;Med;;true;;true;true;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmby_;Ortho;true;;;true;true;;true;;;;2;2;2;2;2;
-Neh_TtwPcuW60cfmby_;Ger;;;true;;true;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmbya;Ger;;;true;;true;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmbya;Ortho;true;;;;true;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmbyb;Neuro - ped;;;true;true;;;true;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmbyb;Tournus SC med-chir - Cardio ;;true;;true;;;true;;;;2;2;2;2;2;
-Neh_TtwPcuW60cfmbyb;Soins intensifs;;true;;true;;;true;;;;1;0;0;1;1;
-Neh_TtwPcuW60cfmbyb;Chir viscerale, ORL et thoracique - Pneumo;true;true;;true;;;;;;;1;1;1;1;1;
-Neh_TtwPcuW60cfmbyc;Ortho;true;;true;true;true;;;true;;;2;2;2;2;2;
-Neh_TtwPcuW60cfmbyd;Ger;;;true;;true;;true;;;;2;2;2;1;1;
-Neh_Ttxx1ljaMN6U_6j;Neuro - Ped;;;true;;true;;true;;;;0;0;0;0;1;
-Neh_Ttxx1ljaMN6U_6k;Ambu;true;;true;;true;true;true;;;;0;0;0;1;0;
-Neh_Ttxx1ljaMN6U_6l;Ortho;true;;true;true;true;;;true;;;0;0;1;0;0;
-Neh_Ttxx1ljaMN6U_6m;Ortho;true;;;;true;;true;true;;;3;3;3;3;3;
-Neh_Ttxx1ljaMN6U_6n;Ortho - Med;true;true;;;true;;true;true;;;2;2;2;2;2;
-Neh_Ttxx1ljaMN6U_6p;Ambu;true;;true;;true;true;true;;;;1;1;1;1;1;
-Neh_Ttxx1ljaMN6U_6o;Ambu;true;;true;true;;true;true;;;;1;1;1;1;1;
-Neh_Ttxx1ljaMN6U_6q;Ambu;true;;true;;true;true;;true;;;2;0;0;3;3;
-Neh_Ttyk116hb9GIKGv;Ambu;true;;true;;true;true;true;;;;0;1;0;1;1;
-Neh_Ttyk116hb9GIKGw;Ambu;true;;true;;true;true;true;;;;1;0;1;1;1;
-Neh_Ttyk116hb9GIKGx;Ambu;true;;true;;true;true;;true;;;1;1;0;1;1;
-Neh_Ttyk116hb9GIKGy;Ambu;true;;true;;true;true;;true;;;0;0;0;0;0;Revoir si besoin pour PFP3 et demander
-Neh_Ttyk116hb9GIKGz;Ambu;true;;true;;true;true;true;;;;;;;;;
-Neh_Ttyk116hb9GIKH-;Ambu;true;;true;;true;true;true;;;;1;1;0;1;1;
-Neh_Ttyk116hb9GIKH0;Ambu;true;;true;;true;true;true;;;;0;0;0;0;0;
-Neh_Ttyk116hb9GIKH2;Ambu;true;;true;;true;true;true;;;;0;0;0;1;0;A voir lors de repartition avec GT FP
-Neh_Ttyk116hb9GIKH4;Ambu;true;;true;;true;true;true;;;;1;1;1;1;1;
-Neh_Ttyk116hb9GIKH5;Ambu;true;;true;;true;true;;true;;;1;0;0;1;1;
-Neh_Ttyk116hb9GIKH6;Ambu;true;;true;;true;true;;true;;;1;1;1;1;1;
-Neh_Ttyk116hb9GIKH7;Ambu;true;;true;;true;true;;true;;;1;0;0;1;1;
-Neh_Ttzz1yliQ8-FCwT;Ambu;true;;true;;true;true;;true;;;0;0;0;0;0;
-Neh_Ttzz1yliQ8-FCwU;Ambu;true;;true;;true;true;true;true;;;0;0;0;0;0;
-Neh_Ttzz1yliQ8-FCwV;Neuro;;;true;;true;;;true;;;0;0;0;1;0;PFP de 18 semaines durant PFP4 (etudiant.e suivra PFP3 et PFP4 ensemble)
-Neh_Ttzz1yliQ8-FCwW;Neuro;;;true;;true;;;true;;;0;0;0;1;0;PFP de 18 semaines durant PFP4 (etudiant.e suivra PFP3 et PFP4 ensemble)
-Neh_Ttzz1yliQ8-FCwY;Med;;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwY;Ortho;true;;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwZ;Neuro;;;true;;true;;;true;;;0;0;0;1;0;PFP de 18 semaines durant PFP4 (etudiant.e suivra PFP3 et PFP4 ensemble)
-Neh_Ttzz1yliQ8-FCw_;Neuro;;;true;;true;;;true;;;0;0;0;0;0;
-Neh_Ttzz1yliQ8-FCwa;Soins intensifs (DCILM-SMIA);;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwa;Pediatrie (DFME-HEL6 - Site HEL);true;;;true;;true;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwa;Pediatrie (DFME - ENF6 - Site BH);;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwa;Ger;;;true;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwc;Neuro;;;true;;true;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Tu-HYARvsZv31DN;Medecine interne;;true;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Tu-HYARvsZv31DN;Ortho;true;;;true;;;true;;;;;;;;;A voir lors de repartition avec GT FP
-Neh_Ttzz1yliQ8-FCwd;Ortho;true;;;;true;;;true;;;0;0;0;1;1;
-Neh_Ttu3CYo8WbkqIJn;Ambu;true;;true;;true;true;true;;;;0;0;1;0;1;
-Neh_Tu-HYARvsZv31DQ;Ambu;true;;true;;true;true;true;;;;1;1;1;1;1;
-Neh_Tu-HYARvsZv31DR;Ambu;true;;true;;true;true;;true;;;;;;;;
-Neh_Tu-HYARvsZv31DU;Ambu;true;;;;true;true;;true;;;;;;;;
-Neh_Tu0ifoZo_RPDyHw;Neuro - ped - adultes a besoin particuliers;;;true;;true;;true;;;;0;1;0;1;0;
-Neh_Tu0ifoZo_RPDyHy;Ambu;true;;true;;true;true;true;;;;1;0;0;1;1;
-Neh_Tu0ifoZo_RPDyHz;Ambu - Ger;;;true;;true;true;true;;;;0;0;1;0;0;
-Neh_Tu0ifoZo_RPDyI-;Ambu;true;true;true;;true;true;true;;;;1;1;0;1;1;
-O3kdUkVgFHB-W67PGLP;Ambu;true;;true;;true;true;true;true;;;0;1;0;1;1;
-O3kepWKa225tBUSxTCl;Ambu;true;;true;;true;true;true;;;;1;0;0;1;1;
-O3knneiST1PVo8C-Lsw;Ambu;true;;true;;true;true;true;;;;1;0;0;1;0;
-O3kooIChpHG3drVGiFR;Ambu;true;;;true;;true;;true;;;;;;;;
-O3krL2VJzl4ioQMbG1j;Ambu;true;;true;;true;true;true;;;;1;0;0;0;1;
-O3ksAua4hQ2dEaDzCJv;Ambu;true;;true;;true;true;;true;;;1;0;0;0;0;

`;

const jsonData = csvToJson(csvData);
saveJsonToFile(jsonData);