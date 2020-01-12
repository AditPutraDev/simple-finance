function loadCatatan() {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>ID</th>' +
                '<th>Type</th>' +
                '<th>Jumlah</th>' +
                '<th>Note</th>' +
                '<th>Hapus Transaksi</th>' +
                '<th>Lihat Transaksi</th>' +
                '<th>Edit Transaksi</th>' +
                '</thead> <tbody>';
 
            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id_data + ' </td>' +
                    '<td>' + list_data[i].type + ' </td>' +
                    '<td>' + list_data[i].jumlah + ' </td>' +
                    '<td>' + list_data[i].note + ' </td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="lihatData(\'' + list_data[i].id_data + '\')">Lihat</a></td>' +
                    '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\'' + list_data[i].id_data + '\')">Edit</a></td>';
                data_app += '</tr>';
            }
 
            data_app += '</tbody></table>';
 
        }
        else {
            data_app = "Belum ada transaksi, ayo catat transaksi harianmu";
        }
 
 
        $('#list-transaksi').html(data_app);
        $('#list-transaksi').hide();
        $('#list-transaksi').fadeIn(100);
    }
}
 
function editData(id) {
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#eid_data").val(list_data[i].id_data);
                $("#etype").val(list_data[i].type);
                $("#ejumlah").val(list_data[i].jumlah);
                $("#enote").val(list_data[i].note);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('edit-data');
 
    }
 
}
 
function lihatData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                $("#lid_data").val(list_data[i].id_data);
                $("#ltype").val(list_data[i].type);
                $("#ljumlah").val(list_data[i].jumlah);
                $("#lnote").val(list_data[i].note);
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        gantiMenu('lihat-data');
 
    }
}
 
 
function simpanData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Transaksi baru berhasil disimpan"
        }]).then(function() {
            alert('Transaksi Tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error emm...');
        });
    }
 
    type = $('#type').val();
    jumlah = $('#jumlah').val();
    note = $('#note').val();
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'type': type, 'jumlah': jumlah, 'note': note });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('list-transaksi');
 
    return false;
}
 
function simpanEditData() {

    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Transaksi yang diedit sudah tersimpan"
        }]).then(function() {
            alert('Transaksi tersimpan');
        }).catch(function(error) {
            alert('Aduh kok error emm...');
        });
    }
 
    id_data = $('#eid_data').val();
    type = $('#etype').val();
    jumlah = $('#ejumlah').val();
    note = $('#enote').val();
 
    list_data.push({ 'id_data': id_data, 'type': type, 'jumlah': jumlah, 'note': note });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    gantiMenu('list-transaksi');
 
    return false;
}
 
function hapusData(id) {

    
    if (!liff.isInClient()) {
        sendAlertIfNotInClient();
    } else {
        liff.sendMessages([{
            'type': 'text',
            'text': "Transaksi sudah terhapus"
        }]).then(function() {
            alert('Transaksi sudah dihapus');
        }).catch(function(error) {
            alert('Aduh kok nggak ke hapus ya ..');
        });
    }
 
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
 
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
 
        localStorage.setItem('list_data', JSON.stringify(list_data));
        loadCatatan();
    }
}
 
 
function gantiMenu(menu) {
    if (menu == "list-transaksi") {
        loadCatatan();
        $('#tambah-transaksi').hide();
        $('#list-transaksi').fadeIn();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    }
    else if (menu == "tambah-transaksi") {
        $('#tambah-transaksi').fadeIn();
        $('#list-transaksi').hide();
        $('#edit-data').hide();
        $('#lihat-data').hide();
    } else if (menu == "edit-data") {
        $('#edit-data').fadeIn();
        $('#tambah-transaksi').hide();
        $('#list-transaksi').hide();
        $('#lihat-data').hide();
    } else if (menu == "lihat-data") {
        $('#lihat-data').fadeIn();
        $('#edit-data').hide();
        $('#tambah-transaksi').hide();
        $('#list-transaksi').hide();
    }
}