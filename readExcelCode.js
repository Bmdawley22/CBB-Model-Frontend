readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)

        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, { type: 'buffer'});

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const stats = XLSX.utils.sheet_to_json(ws);

            resolve(stats);
        }

        fileReader.onerror = ((error) => {
            reject(error);
        })
    });
    
    promise.then((stats) => {

        const headerArr = [];
        for (const[key] of Object.entries(stats[0])) {
            headerArr.push(key)
        }
        this.setState({ header: headerArr })

        let tempTeamStats = [];
        let statArr = []
        for (let i = 0; i < stats.length; i++) {
            for (const[key, value] of Object.entries(stats[i])) {
                tempTeamStats.push(value)
            }
            statArr[i] = tempTeamStats;
            tempTeamStats = [];
        }
        this.setState({ stats: statArr })
    })
}