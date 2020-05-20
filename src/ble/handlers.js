startScan() {
    if (!this.state.scanning) {
        //this.setState({peripherals: new Map()});
        BleManager.scan([], 3, true).then(results => {
            console.log('Scanning...');
            this.setState({
                scanning: true,
            });
        });
    }
}


connectToNewBag(bagId, pin) {
    BleManager.connect(bagId).then(() => {
        let bags = this.state.bags;
        let p = bags.get(bagId);
        if (p) {
            p.connected = true;
            bags.set(bagId, p);
            this.setState({
                bags,
                paired: bags[0],
            });
        }
        console.log('Connected to ' + bagId);
        console.log('pin', pin);

        dataObject[0].data = pin;

        setTimeout(() => {
            BleManager.retrieveServices(bagId).then(bagInfo => {
                console.log('retrieved services');
                console.log(bagInfo.characteristics);
                writeAllCharacteristicsNew(bagId, dataObject);
            });
            setTimeout(() => {
                this.storePinAndBagId(pin, bagId);
            }, 1000);
            this.props.navigation.navigate('home');
        });
    });
}


writeToMyBag(bag, data, pin) {
    if (bag) {
        if (!bag.connected) {
            BleManager.connect(bag.id).then(() => {
                let bags = this.state.bags;
                let b = bags.get(bag.id);
                if (b) {
                    b.connected = true;
                    bags.set(bag.id, b);
                    this.setState({
                        bags,
                        paired: bags[0],
                    });
                }
                console.log(`Connected to ${bag.id}`);
            }).catch((e) => {
                return console.log(`failed to connect: ${e}`)
            })
            BleManager.retrieveServices(bag.id).then(bagInfo => {
                console.log('retrieved services');
                console.log(bagInfo.characteristics);
            });
            writeAllCharacteristicsNew(bag.id, data);
            console.log(`wrote: ${JSON.stringify(data)} to bag`);
            Alert.alert('not currently connected');
        }
    }
}

showPinDialog(bagId) {
    this.setState({
        pinDialogVisible: true,
        bagId: bagId,
    });
}

closePinDialog() {
    this.setState({
        pinDialogVisible: false
    });
};