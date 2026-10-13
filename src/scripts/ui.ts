/**
 * Small helpers shared by the page features that need JavaScript: a quiet "Copied" message, copying to the
 * clipboard, and revealing buttons that only make sense when scripts run. Every feature using them also works
 * without scripts (the buttons simply stay hidden).
 */

// Buttons marked data-needs-js are hidden in the page's HTML and shown here, once scripts are running.
for (const element of document.querySelectorAll<HTMLElement>('[data-needs-js]')) element.hidden = false;

let toast: HTMLElement | undefined;
let toastTimer: number | undefined;

/** Announces a brief message to screen readers and, unless `visible` is false, shows it at the bottom of the screen. */
export function announce(message: string, visible = true) {
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  window.clearTimeout(toastTimer);
  // The text is set a moment after the element is shown, which is what makes screen readers read it.
  toast.classList.remove('is-visible');
  window.setTimeout(() => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle('is-silent', !visible);
    toast.classList.add('is-visible');
  }, 30);
  toastTimer = window.setTimeout(() => toast?.classList.remove('is-visible'), 2400);
}

/** Copies text (and, when given, the same text with its formatting) to the clipboard. Resolves to whether it worked. */
export async function copyToClipboard(text: string, html?: string): Promise<boolean> {
  try {
    if (html && typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' }),
        }),
      ]);
      return true;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the older method below
  }
  try {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.append(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

/** Briefly replaces a button's label with a confirmation ("Copied"), and says it aloud. */
export function confirmOnButton(button: HTMLElement, message: string, done = 'Copied') {
  const original = button.dataset.label ?? button.textContent ?? '';
  button.dataset.label = original;
  button.textContent = done;
  button.classList.add('is-done');
  announce(message, false); // the button's own words already show the result
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove('is-done');
  }, 1800);
}
