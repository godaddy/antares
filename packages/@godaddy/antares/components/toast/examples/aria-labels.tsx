import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * Pass translated labels once on the region, through `ariaLabels`. Toast content is rendered inside
 * your app, so it can use your own i18n context directly.
 * @title Translated Labels
 * @order 4
 */
export function AriaLabelsExample() {
  return (
    <>
      <ToastRegion queue={queue} ariaLabels={{ region: 'Notificaciones', close: 'Cerrar' }} />
      <Button
        variant="secondary"
        onPress={function showToast() {
          queue.add({ title: 'Dominio conectado', message: 'Tu sitio ya está en línea.', emphasis: 'success' });
        }}
      >
        Mostrar aviso
      </Button>
    </>
  );
}
