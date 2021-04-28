<div class="{{$viewClass['form-group']}}">
    <label for="{{$id}}" class="{{$viewClass['label']}} control-label">{{$label}}</label>

    <div class="{{$viewClass['field']}}">

        <div class="sku_warp {{$class}}">
            <input type="hidden" class="Js_sku_input" name="{{$name}}" value="{{old($column, $value)}}">
            <div class="sku_attr_key_val">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th style="width: 150px">规格名</th>
                        <th>规格值</th>
                        <th style="width: 100px">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input type="text" class="form-control">
                            <input type="checkbox" class="check-Image"> <span style="color: #0d6aad">添加规格图片</span>
                        </td>
                        <td>
                            <div class="sku_attr_val_warp">
                                <div class="sku_attr_val_item sku_attr_num">
                                    <div class="sku_attr_val_input">
                                        <div class="sku_Image" style="display: none">
                                            <input value="" type="hidden" class="form-control"><span class="Js_sku_upload">+</span>
                                        </div>
                                        <input type="text" class="form-control">
                                    </div>
                                    <span class="btn btn-danger Js_remove_attr_val"><i
                                            class="glyphicon glyphicon-remove"></i></span>
                                </div>
                                <div class="sku_attr_val_item Js_add_attr_val" style="padding-left: 10px">
                                    <span class="btn btn-success"><i class="glyphicon glyphicon-plus"></i></span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="btn btn-success Js_add_attr_name">添加</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- 操作SKU -->
            <div class="sku_edit_warp">
                <table class="table table-bordered" style="width: auto">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
