// @ts-nocheck
$.extend($.summernote.plugins, {
    file_upload: function (context) {
        var ui = $.summernote.ui;

        context.memo('button.file_upload', function () {
            var button = ui.buttonGroup([
                ui.button({
                    className: 'dropdown-toggle summernote-file-upload-btn',
                    contents: '<span class="fa fa-paperclip fa-flip-horizontal fa-lg"></span>',
                    tooltip: context.options.langInfo.file_upload.tooltip,
                    data: {
                        toggle: 'dropdown'
                    }
                }),
                ui.dropdown({
                    items: [
                        [`<span data-type='local'><i class='fa fa-paperclip fa-flip-horizontal'></i> ${context.options.langInfo.file_upload.from_computer}</span>`],
                    ],
                    className: 'dropdown-file-upload-control',
                    click: function (event) {
                        var $button = $(event.target);
                        var { type } = $button.data();

                        $('<input type="file">')
                            .on('change', function () {
                                let token = $('meta[name="csrf-token"]').attr('content');
                                let fd = new FormData();
                                fd.append('file', this.files[0]);
                                fd.append('_token', token);

                                $.ajax({
                                    dataType: 'json',
                                    type: 'POST',
                                    url: `${appBaseUrl}/file/upload`,
                                    data: fd,
                                    processData: false,
                                    contentType: false,
                                    beforeSend: () => {
                                        showNotification({
                                            color_name: "alert-info",
                                            message: context.options.langInfo.loader.text
                                        });
                                    },
                                    error: (jqXHR, exception) => {
                                        showNotification({
                                            color_name: "alert-danger",
                                            message: formatErrorMessage(jqXHR, exception)
                                        });
                                    },
                                    success: result => {
                                        $.notifyClose();
                                        context.invoke('editor.pasteHTML', result.template);
                                    }
                                });
                            })
                            .click();
                    }
                })
            ]);

            return button.render();
        });
    }
});