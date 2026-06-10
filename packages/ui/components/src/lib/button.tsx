import type { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import type { Styles } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonStyleOverride = Styles<{
  color?: string;
  backgroundColor?: string;
  paddingInline?: string;
  paddingBlock?: string;
}>;

export type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ButtonStyleOverride;
  'data-testid'?: string;
};

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  'data-testid': dataTestId,
}: ButtonProps) {
  return (
    <html.button
      data-testid={dataTestId}
      disabled={disabled}
      onClick={disabled ? undefined : onPress}
      style={[styles.root, styles[variant], disabled && styles.disabled, style]}
    >
      {children}
    </html.button>
  );
}

const styles = css.create({
  root: {
    borderWidth: 0,
    borderStyle: 'none',
    paddingInline: spacing.x4,
    paddingBlock: spacing.x3,
    borderRadius: radius.md,
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
  },
  primary: {
    backgroundColor: {
      default: colors.actionPrimary,
      ':hover': colors.actionPrimaryHover,
      ':active': colors.actionPrimaryHover,
    },
    color: colors.textOnAction,
  },
  secondary: {
    backgroundColor: colors.bgCard,
    color: colors.textPrimary,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
});
