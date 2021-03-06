(function () {

    function SKU(uploadHost) {
        this.warp = $('.sku_warp')
        this.uploadHost = uploadHost;
        this.attrs = {};
        this.commonSku = '';
        this.commonStock = 0; // 统一库存
        this.commonPrice = 0; // 统一价格
        this.commonMarketPrice = 0; // 统一市场价格
        this.init();
    }

    SKU.prototype.init = function () {
        let _this = this;
        _this.warp.find('.sku_attr_key_val').on('click', '.Js_add_attr_val', function () {
            var imageChecked = $(this).parents('td').prev().find('.check-Image').prop('checked');
            if (imageChecked === true) {
                var imageHtml = '<div class="sku_Image">';
            } else {
                var imageHtml = '<div class="sku_Image" style="display: none">';
            }
            let html = '<div class="sku_attr_val_item sku_attr_num">' +
                '<div class="sku_attr_val_input">' +
                imageHtml +
                '<input value="" type="hidden" class="form-control"><span class="Js_sku_upload">+</span>' +
                '</div>' +
                '<input type="text" class="form-control sku_input_value">' +
                '</div>' +
                '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
                '</div>';
            $(this).before(html);
            _this.warp.find('.sku_Image').on('click', '.Js_sku_upload', function () {
                _this.upload($(this))
            });
        });

        // 绑定属性值移除事件
        _this.warp.find('.sku_attr_key_val').on('click', '.Js_remove_attr_val', function () {
            var sku_length = $(this).parents('.sku_attr_val_warp').children('.sku_attr_num').length;
            if (sku_length > 1) {
                $(this).parent('.sku_attr_val_item').remove();
                _this.getSkuAttr();
            }
        });

        // 绑定添加属性名事件
        _this.warp.find('.Js_add_attr_name').click(function () {
            let html = '<tr>' +
                '<td><input type="text" class="form-control"><input type="hidden" value="false" class="check-Image"></td>' +
                '<td>' +
                '<div class="sku_attr_val_warp">' +
                '<div class="sku_attr_val_item sku_attr_num">' +
                '<div class="sku_attr_val_input">' +
                '<div class="sku_Image" style="display: none">' +
                '<input value="" type="hidden" class="form-control"><span class="Js_sku_upload">+</span>' +
                '</div>' +
                '<input type="text" class="form-control sku_input_value">' +
                '</div>' +
                '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
                '</div>' +
                '<div class="sku_attr_val_item Js_add_attr_val" style="padding-left:10px">' +
                '<span class="btn btn-success"><i class="glyphicon glyphicon-plus"></i></span>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<span class="btn btn-danger Js_remove_attr_name">移除</span>' +
                '</td>' +
                '</tr>';
            _this.warp.find('.sku_attr_key_val tbody').append(html)
        });

        // 自定义规格图片上传
        _this.warp.find('.sku_attr_key_val').on('click', '.check-Image', function () {
            if ($(this).prop('checked') === true) {
                $(this).parents('td').next().find('.sku_Image').show();
            } else {
                $(this).parents('td').next().find('.sku_Image').hide();
            }
            _this.warp.find('.sku_Image').on('click', '.Js_sku_upload', function () {
                _this.upload($(this))
            });
        });

        // 绑定移除属性名事件
        _this.warp.find('.sku_attr_key_val').on('click', '.Js_remove_attr_name', function () {
            $(this).parents('tr').remove();
            _this.getSkuAttr()
        });

        // 绑定input变化事件
        _this.warp.find('.sku_attr_key_val tbody').on('change', 'input', _this.getSkuAttr.bind(_this));
        _this.warp.find('.sku_edit_warp tbody').on('keyup', 'input', _this.processSku.bind(_this));

        // 统一价格
        _this.warp.find('.sku_edit_warp thead').on('keyup', 'input.Js_price', function () {
            _this.commonPrice = $(this).val();
            _this.warp.find('.sku_edit_warp tbody td[data-field="price"] input').val(_this.commonPrice);
            _this.processSku()
        });

        // 统一市场价
        _this.warp.find('.sku_edit_warp thead').on('keyup', 'input.Js_market_price', function () {
            _this.commonMarketPrice = $(this).val();
            _this.warp.find('.sku_edit_warp tbody td[data-field="marketprice"] input').val(_this.commonMarketPrice);
            _this.processSku()
        });

        // 统一库存
        _this.warp.find('.sku_edit_warp thead').on('keyup', 'input.Js_stock', function () {
            _this.commonStock = $(this).val();
            _this.warp.find('.sku_edit_warp tbody td[data-field="stock"] input').val(_this.commonStock);
            _this.processSku()
        });

        // SKU图片上传
        _this.warp.find('.sku_Image').on('click', '.Js_sku_upload', function () {
            _this.upload($(this))
        });

        // 清空SKU图片
        _this.warp.find('.sku_edit_warp tbody').on('click', '.Js_sku_del_pic', function () {
            let td = $(this).parent();
            td.find('input').val('');
            td.find('.Js_sku_upload').css('background-image', 'none');
            _this.processSku()
        });

        let old_val = _this.warp.find('.Js_sku_input').val();
        if (old_val) {
            // 根据值生成DOM
            old_val = JSON.parse(old_val);
            // 处理规格名
            let attr_names = old_val.attrs;
            let tbody = _this.warp.find('.sku_attr_key_val tbody');
            let attr_keys = Object.keys(attr_names);
            let attr_form = {}; // 所有属性
            let attr_keys_len = attr_keys.length;
            attr_keys.forEach(function (attr_key, index) {
                // 规格名
                let tr = tbody.find('tr').eq(index);
                tr.find('td:eq(0) input').val(attr_key);
                // 规格值
                let attr_val_td = tr.find('td:eq(1)');
                let attr_vals = attr_names[attr_key].value;
                let attr_vals_len = attr_vals.length;
                attr_vals.forEach(function (attr_val, index_2) {
                    attr_val_td.find('.sku_input_value').eq(index_2).val(attr_val.value);
                    if (index_2 < attr_vals_len - 1) {
                        attr_val_td.find('.Js_add_attr_val').trigger('click');
                    }
                });
                // 接着处理下一行
                if (index < attr_keys_len - 1) {
                    tbody.find('tr').eq(0).find('td:eq(2) .Js_add_attr_name').trigger('click');
                }
            });
            let trs = _this.warp.find('.sku_attr_key_val tbody tr');
            trs.each(function () {
                let tr = $(this);
                let attr_name = tr.find('td:eq(0) input').val(); // 属性名
                let attr_is_image = tr.find('td:eq(0) .check-Image').prop('checked'); // 是否有图片
                let attr_form_val = []; // 属性值
                let attr_val = []; // 属性值
                if (attr_name) {
                    // 获取对应的属性值
                    tr.find('td:eq(1) .sku_input_value').each(function () {
                        let ipt_val = $(this).val();
                        if (attr_is_image === true) {
                            var pit_cover = $(this).prev().find('input').val();
                        } else {
                            var pit_cover = '';
                        }
                        if (ipt_val) {
                            attr_val.push({
                                'image': pit_cover,
                                'value': ipt_val,
                            });
                            attr_form_val.push(ipt_val);
                        }
                    });
                }
                if (attr_val.length) {
                    attr_form[attr_name] = attr_form_val;
                }
            });
            // 生成具体的SKU配置表单
            _this.attrs_form = attr_form;
            _this.attrs = old_val.attrs;
            _this.SKUForm(old_val.sku);
        } else {
            _this.processSku()
        }
    }

    // 获取SKU属性
    SKU.prototype.getSkuAttr = function () {
        let attr = {}; // 所有属性
        let attr_form = {}; // 所有属性
        let _this = this;
        let trs = _this.warp.find('.sku_attr_key_val tbody tr');
        trs.each(function () {
            let tr = $(this);
            let attr_name = tr.find('td:eq(0) input').val(); // 属性名
            let attr_is_image = tr.find('td:eq(0) .check-Image').prop('checked'); // 是否有图片
            let attr_val = []; // 属性值
            let attr_form_val = []; // 属性值
            if (attr_name) {
                // 获取对应的属性值
                tr.find('td:eq(1) .sku_input_value').each(function () {
                    let ipt_val = $(this).val();
                    if (attr_is_image === true) {
                        var pit_cover = $(this).prev().find('input').val();
                    } else {
                        var pit_cover = '';
                    }
                    if (ipt_val) {
                        attr_val.push({
                            'image': pit_cover,
                            'value': ipt_val,
                        });
                        attr_form_val.push(ipt_val);
                    }
                });
            }
            if (attr_val.length) {
                attr[attr_name] = {
                    'isImage': attr_is_image ? 1 : 0,
                    'value': attr_val,
                };
                attr_form[attr_name] = attr_form_val;
            }
        });

        if (JSON.stringify(_this.attrs) !== JSON.stringify(attr)) {
            _this.attrs = attr;
            _this.attrs_form = attr_form;
            let old_val = _this.warp.find('.Js_sku_input').val();
            old_val = JSON.parse(old_val);
            _this.SKUForm(old_val.sku)
        }
    };

    // 生成具体的SKU配置表单
    SKU.prototype.SKUForm = function (default_sku) {
        let _this = this;
        let attr_names = Object.keys(_this.attrs);
        if (attr_names.length === 0) {
            _this.warp.find('.sku_edit_warp tbody').html(' ');
            _this.warp.find('.sku_edit_warp thead').html(' ');
        } else {
            // 渲染表头
            let thead_html = '<tr>';
            attr_names.forEach(function (attr_name) {
                thead_html += '<th>' + attr_name + '</th>'
            });
            thead_html += '<th style="display: none">sku</th>';
            thead_html += '<th style="width: 100px">市场价 <input value="' + _this.commonMarketPrice + '" type="text" style="width: 50px" class="Js_market_price"></th>';
            thead_html += '<th style="width: 100px">销售价 <input value="' + _this.commonPrice + '" type="text" style="width: 50px" class="Js_price"></th>';
            thead_html += '<th style="width: 100px">库存 <input value="' + _this.commonStock + '" type="text" style="width: 50px" class="Js_stock"></th>';
            thead_html += '</tr>';
            _this.warp.find('.sku_edit_warp thead').html(thead_html);

            // 求笛卡尔积
            let cartesianProductOf = (function () {
                return Array.prototype.reduce.call(arguments, function (a, b) {
                    var ret = [];
                    a.forEach(function (a) {
                        b.forEach(function (b) {
                            ret.push(a.concat([b]));
                        });
                    });
                    return ret;
                }, [[]]);
            })(...Object.values(_this.attrs_form));

            // 根据计算的笛卡尔积渲染tbody
            let tbody_html = '';
            cartesianProductOf.forEach(function (sku_item) {
                tbody_html += '<tr>';
                sku_item.forEach(function (attr_val, index) {
                    let attr_name = attr_names[index];
                    tbody_html += '<td data-field="' + attr_name + '">' + attr_val + '</td>';
                });
                if (_this.commonSku == '') {
                    var skuUuid = uuid();
                } else {
                    var skuUuid = _this.commonSku;
                }
                tbody_html += '<td data-field="sku_no" style="display: none"><input value="' + skuUuid + '" type="text" class="form-control"></td>';
                tbody_html += '<td data-field="marketprice"><input value="' + _this.commonMarketPrice + '" type="text" class="form-control"></td>';
                tbody_html += '<td data-field="price"><input value="' + _this.commonPrice + '" type="text" class="form-control"></td>';
                tbody_html += '<td data-field="stock"><input value="' + _this.commonStock + '" type="text" class="form-control"></td>';
                tbody_html += '</tr>'
            });
            _this.warp.find('.sku_edit_warp tbody').html(tbody_html);

            if (default_sku) {
                // 填充数据
                default_sku.forEach(function (item_sku, index) {
                    let tr = _this.warp.find('.sku_edit_warp tbody tr').eq(index);
                    Object.keys(item_sku).forEach(function (field) {
                        let input = tr.find('td[data-field="' + field + '"] input');
                        if (input.length) {
                            input.val(item_sku[field]);
                            let sku_upload = tr.find('td[data-field="' + field + '"] .Js_sku_upload');
                            if (sku_upload.length) {
                                sku_upload.css('background-image', 'url(' + item_sku[field] + ')');
                            }
                        }
                    })
                });
            }
        }
        _this.processSku()
    };

    // 处理最终SKU数据，并写入input
    SKU.prototype.processSku = function () {
        let _this = this;
        let sku_json = {};
        sku_json.attrs = _this.attrs;
        let sku = [];
        _this.warp.find('.sku_edit_warp tbody tr').each(function () {
            let tr = $(this);
            let item_sku = {};
            tr.find('td[data-field]').each(function () {
                let td = $(this);
                let field = td.attr('data-field');
                let input = td.find('input');
                if (input.length) {
                    item_sku[field] = input.val();
                } else {
                    item_sku[field] = td.text();
                }
            });
            sku.push(item_sku);
        });
        sku_json.sku = sku;
        _this.warp.find('.Js_sku_input').val(JSON.stringify(sku_json));
    };

    // 图片上传
    SKU.prototype.upload = function (obj) {
        let _this = this;
        // 创建input[type="file"]元素
        let file_input = document.createElement('input');
        file_input.setAttribute('type', 'file');
        file_input.setAttribute('accept', 'image/x-png,image/jpeg');

        // 模拟点击 选择文件
        file_input.click();

        file_input.onchange = function () {
            let file = file_input.files[0];  //获取上传的文件名
            let formData = new FormData();
            formData.append('file', file);
            formData.append('_token', LA.token);
            // 使用ajax上传文件
            let url = _this.uploadHost;
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                contentType: false, //告诉jQuery不要去设置Content-Type请求头
                headers: {
                    Accept: "application/json"
                },
                processData: false, //告诉jQuery不要去处理发送的数据
                success: function (res) {
                    if (res.code == 1) {
                        obj.css('background-image', 'url(' + res.data.showpath + ')');
                        obj.parent().find('input').val(res.data.path);
                        _this.getSkuAttr()
                        _this.processSku()
                    }
                }
            })
        }
    };

    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";   // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);   // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }

    window.GoodsSKU = SKU;
})();
