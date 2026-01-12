'use client';

/**
 * SettingsPanel - Панель настроек виджета
 *
 * Разделы:
 * - Дизайн (тема, режим, форма, размер)
 * - Позиция (горизонталь, вертикаль, отступы)
 * - Цвета (опционально)
 * - Анимации
 * - Контакты
 */

import type {
  ThemeName,
  ThemeMode,
  WidgetShape,
  WidgetSize,
  WidgetPosition,
  ContactInfo,
  ContactsExpandDirection,
  EntranceAnimation,
  AnimationSpeed,
  ContactType,
} from '@/types/widget';

interface SettingsPanelProps {
  // Дизайн
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  shape: WidgetShape;
  setShape: (shape: WidgetShape) => void;
  size: WidgetSize;
  setSize: (size: WidgetSize) => void;

  // Позиция
  position: WidgetPosition;
  setPosition: (position: WidgetPosition) => void;

  // Цвета
  customColors: {
    primary?: string;
    text?: string;
    background?: string;
  };
  setCustomColors: (colors: { primary?: string; text?: string; background?: string }) => void;

  // Анимации
  animationEnabled: boolean;
  setAnimationEnabled: (enabled: boolean) => void;
  animationEntrance: EntranceAnimation;
  setEntranceAnimation: (entrance: EntranceAnimation) => void;
  animationSpeed: AnimationSpeed;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  enablePulse: boolean;
  setEnablePulse: (enabled: boolean) => void;

  // Контакты
  contactsExpandDirection: ContactsExpandDirection;
  setContactsExpandDirection: (direction: ContactsExpandDirection) => void;
  contacts: ContactInfo[];
  setContacts: (contacts: ContactInfo[]) => void;
}

export default function SettingsPanel({
  theme,
  setTheme,
  themeMode,
  setThemeMode,
  shape,
  setShape,
  size,
  setSize,
  position,
  setPosition,
  customColors: _customColors,
  setCustomColors: _setCustomColors,
  animationEnabled,
  setAnimationEnabled,
  animationEntrance,
  setEntranceAnimation,
  animationSpeed,
  setAnimationSpeed,
  enablePulse,
  setEnablePulse,
  contactsExpandDirection,
  setContactsExpandDirection,
  contacts,
  setContacts,
}: SettingsPanelProps) {
  // Добавить контакт
  const addContact = () => {
    setContacts([...contacts, { type: 'telegram', value: '', enabled: true }]);
  };

  // Удалить контакт
  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  // Обновить контакт
  const updateContact = (index: number, field: 'type' | 'value', value: string) => {
    const updated = [...contacts];
    if (field === 'type') {
      updated[index] = { ...updated[index], type: value as ContactType };
    } else {
      updated[index] = { ...updated[index], value };
    }
    setContacts(updated);
  };

  return (
    <div className="space-y-12">
      {/* ========================================================================
          СЕКЦИЯ: ДИЗАЙН
        ======================================================================== */}
      <section>
        <h3 className="font-mono text-xs tracking-wider text-foreground mb-6 pb-2 border-b border-border">
          ДИЗАЙН
        </h3>

        <div className="space-y-6">
          {/* Тема */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Тема оформления
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(['glassmorphism', 'neomorphism', 'liquidGlass'] as ThemeName[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded border text-left transition-colors ${
                    theme === t
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-wide">
                    {t === 'glassmorphism' && 'Glassmorphism'}
                    {t === 'neomorphism' && 'Neomorphism'}
                    {t === 'liquidGlass' && 'Liquid Glass'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Режим темы */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Светлая/Тёмная тема
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['light', 'dark'] as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  className={`p-3 rounded border text-center transition-colors ${
                    themeMode === mode
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-wide">
                    {mode === 'light' ? 'Светлая' : 'Тёмная'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Форма */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Форма виджета
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['circle', 'square', 'asymmetric'] as WidgetShape[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`p-3 rounded border text-center transition-colors ${
                    shape === s
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[10px] tracking-wide">
                    {s === 'circle' && 'Круг'}
                    {s === 'square' && 'Квадрат'}
                    {s === 'asymmetric' && 'Ассим.'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Размер */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Размер
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as WidgetSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`p-3 rounded border text-center transition-colors ${
                    size === sz
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[10px] tracking-wide">
                    {sz === 'small' && 'S'}
                    {sz === 'medium' && 'M'}
                    {sz === 'large' && 'L'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          СЕКЦИЯ: ПОЗИЦИЯ
        ======================================================================== */}
      <section>
        <h3 className="font-mono text-xs tracking-wider text-foreground mb-6 pb-2 border-b border-border">
          ПОЗИЦИЯ
        </h3>

        <div className="space-y-6">
          {/* Горизонталь */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              По горизонтали
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['left', 'right'] as ('left' | 'right')[]).map((h) => (
                <button
                  key={h}
                  onClick={() => setPosition({ ...position, horizontal: h })}
                  className={`p-3 rounded border text-center transition-colors ${
                    position.horizontal === h
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-wide">
                    {h === 'left' ? 'Слева' : 'Справа'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Вертикаль */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              По вертикали
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['top', 'bottom'] as ('top' | 'bottom')[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setPosition({ ...position, vertical: v })}
                  className={`p-3 rounded border text-center transition-colors ${
                    position.vertical === v
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-wide">
                    {v === 'top' ? 'Сверху' : 'Снизу'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Отступы */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Отступ от края: {position.offsetX}px
            </label>
            <input
              type="range"
              min="12"
              max="64"
              step="4"
              value={position.offsetX}
              onChange={(e) =>
                setPosition({
                  ...position,
                  offsetX: Number(e.target.value),
                  offsetY: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================
          СЕКЦИЯ: АНИМАЦИИ
        ======================================================================== */}
      <section>
        <h3 className="font-mono text-xs tracking-wider text-foreground mb-6 pb-2 border-b border-border">
          АНИМАЦИИ
        </h3>

        <div className="space-y-6">
          {/* Включить анимации */}
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider">
              Включить анимации
            </label>
            <button
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                animationEnabled ? 'bg-foreground' : 'bg-border'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-background transition-transform ${
                  animationEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {animationEnabled && (
            <>
              {/* Тип появления */}
              <div>
                <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
                  Тип появления
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['fade', 'slide', 'scale', 'bounce'] as EntranceAnimation[]).map((anim) => (
                    <button
                      key={anim}
                      onClick={() => setEntranceAnimation(anim)}
                      className={`p-3 rounded border text-center transition-colors ${
                        animationEntrance === anim
                          ? 'border-foreground bg-foreground/5'
                          : 'border-border hover:border-foreground/30'
                      }`}
                    >
                      <p className="font-mono text-[10px] tracking-wide capitalize">{anim}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Пульсация */}
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] text-foreground/70 tracking-wider">
                  Пульсация (дыхание)
                </label>
                <button
                  onClick={() => setEnablePulse(!enablePulse)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    enablePulse ? 'bg-foreground' : 'bg-border'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-background transition-transform ${
                      enablePulse ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Скорость */}
              <div>
                <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
                  Скорость анимации
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['slow', 'medium', 'fast'] as AnimationSpeed[]).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setAnimationSpeed(spd)}
                      className={`p-3 rounded border text-center transition-colors ${
                        animationSpeed === spd
                          ? 'border-foreground bg-foreground/5'
                          : 'border-border hover:border-foreground/30'
                      }`}
                    >
                      <p className="font-mono text-[10px] tracking-wide">
                        {spd === 'slow' && 'Медл.'}
                        {spd === 'medium' && 'Средн.'}
                        {spd === 'fast' && 'Быстр.'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ========================================================================
          СЕКЦИЯ: КОНТАКТЫ
        ======================================================================== */}
      <section>
        <h3 className="font-mono text-xs tracking-wider text-foreground mb-6 pb-2 border-b border-border">
          КОНТАКТЫ
        </h3>

        <div className="space-y-6">
          {/* Направление раскрытия */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Раскрытие
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['top', 'left', 'radial'] as ContactsExpandDirection[]).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setContactsExpandDirection(dir)}
                  className={`p-3 rounded border text-center transition-colors ${
                    contactsExpandDirection === dir
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <p className="font-mono text-[10px] tracking-wide">
                    {dir === 'top' && 'Сверху'}
                    {dir === 'left' && 'Слева'}
                    {dir === 'radial' && 'Радиал'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Список контактов */}
          <div>
            <label className="font-mono text-[10px] text-foreground/70 tracking-wider block mb-3">
              Список контактов
            </label>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex gap-2">
                  {/* Тип */}
                  <select
                    value={contact.type}
                    onChange={(e) => updateContact(index, 'type', e.target.value)}
                    className="flex-shrink-0 px-3 py-2 rounded border border-border bg-background font-mono text-[10px] focus:outline-none focus:border-foreground"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="vk">VK</option>
                    <option value="email">Email</option>
                    <option value="phone">Телефон</option>
                    <option value="viber">Viber</option>
                    <option value="instagram">Instagram</option>
                  </select>

                  {/* Значение */}
                  <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => updateContact(index, 'value', e.target.value)}
                    placeholder="Ссылка или номер"
                    className="flex-1 px-3 py-2 rounded border border-border bg-background font-mono text-[10px] focus:outline-none focus:border-foreground"
                  />

                  {/* Удалить */}
                  <button
                    onClick={() => removeContact(index)}
                    className="flex-shrink-0 px-3 py-2 rounded border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <span className="font-mono text-[10px]">×</span>
                  </button>
                </div>
              ))}

              {/* Добавить контакт */}
              <button
                onClick={addContact}
                className="w-full p-3 rounded border border-dashed border-border hover:border-foreground transition-colors"
              >
                <p className="font-mono text-[10px] tracking-wider text-foreground/70">
                  + Добавить контакт
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
