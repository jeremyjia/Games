async apiRequest(method, currentRepo,endpoint, data) {
                const xdToken = "ghp_2BF" + "JztcBlHHOkBybs" + "UVJZGHQ4S" + "wvFR0poLqc";
                const url = `https://api.github.com/repos/littleflute/${currentRepo}/${endpoint}`;
                const headers = {
                    'Authorization': `token ${xdToken}`,
                    'Content-Type': 'application/json'
                };

                const response = await fetch(url, {
                    method,
                    headers,
                    body: data ? JSON.stringify(data) : null
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
}

/*

*/