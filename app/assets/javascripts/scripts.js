$(document).ready(function() {     
  // Scripts iniciais que modificam o DOM ou geram outras tarefas
  scriptsIniciais();

  // Limpa inputs de formulários. Muito usado na busca avançada.
  clearForms();

});


// Scripts iniciais que modificam o DOM ou geram outras tarefas
function scriptsIniciais(){

  // Insere a possibilidade de inserir acoes especificas de toggle definidos para os collapses
  $('body').on('change.collapse.data-api', '[data-toggle=hide]', function ( e ) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    $(target).collapse('hide')
  })

  $('body').on('change.collapse.data-api', '[data-toggle=show]', function ( e ) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    $(target).collapse('show')
  })

  $(document).ajaxComplete(function(event,request, settings){
    $('[data-toggle=show]').filter(':checked').trigger('change');
  });

  // Classe necessárias para as Labels
  $('label').addClass('control-label');

  // Insere uma classe SELECTED para o primeiro Collpase
  $('.collapseGroup summary:first').addClass('active').parent('.details').addClass('active');

  // Faz a troca de Classe SELECTED entre os Collpases
  $('.collapseGroup summary').click(function(){
    $(this).toggleClass('active');
    $(this).parent('.details').toggleClass('active');
  });


  // Datepicker - JQuery UI
  $('.datepicker').datepicker({
    showOn: "button",
    dateFormat: "dd/mm/yy"
  });
 $('.ui-datepicker-trigger').addClass('icon-calendar').html('').wrap('<span class="add-on">');


  // Faz o texto do link que troca da busca SIMPLES para AVANÇADA
  var btnBuscaAvancadaText = $('a.lnkSeta[data-text]').html();
  var btnBuscaAvancadaTextAlt = $('a.lnkSeta[data-text]').attr('data-text');

  $('.boxFiltro a.lnkSeta[data-target]').click(function(){
    if ( $(this).html() == btnBuscaAvancadaText  ){
      $(this).html(btnBuscaAvancadaTextAlt);
    } else {
      $(this).html( btnBuscaAvancadaText );
    }
  });


  // Verifica se os inputs dentro da busca avançada estão vazios, se não estiverem, a busca avancada fica aberta
    var inputVazio = $('#optBuscaAvancada').find('input[value!=""]').length > 0 || $('#optBuscaAvancada select option:selected').not(':empty').length > 0
    if (inputVazio > 0) {
      $('.boxFiltro a.lnkSeta[data-target]').html(btnBuscaAvancadaTextAlt);
      $('#optBuscaAvancada').addClass('in')
    }

  // Setinha nas TABs
  $('.tabs li:first-child').addClass('active');

  // Faz a modal animar \o/
  $('.modal').hide().addClass('fade');

  // Insere quebra de linha depois das DDs em ListDetails
   $('.listDetail dd').after('<hr class="sep">');


}



// Limpa inputs da busca avançada quando clicamos no link de BUSCA AVANCDA
function clearForms(){
  $('.clearFormBt').click(function(e){
    e.preventDefault();
    $(this).closest('.boxFiltro').find('.clearForm :input').each(function(){
      switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
                this.selected = false;
                break;
            case 'radio':
                this.checked = false;
        }
    })
  });
}
