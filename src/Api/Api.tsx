export async function getOverview(setter: any) {
    await fetch("/api/v1/overview").then((res) => {
        if (res.status === 200) {
            res.json().then(e => {
                setter(e.result)
            })
        }
    })
}

export async function getTables(setter: any) {
    await fetch("/api/v1/tables").then((res) => {
        if (res.status === 200) {
            res.json().then(e => {
                setter(e.result)
            })
        }
    })
}

